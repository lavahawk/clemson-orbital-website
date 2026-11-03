/*
  Logo intro. Include css/intro.css and this script in the <head> (not deferred, so the page is
  hidden before it paints), and mark the element the logo should land in with data-logo-target.

  1. The sphere is drawn like the sketch's pen line.
  2. The ship flies one continuous curl: in from the right, behind the sphere across the top, round
     the left edge, along the trail and round into its resting place. The feathers draw in behind it,
     and a short orange trail follows it once it clears the globe, fading out behind it.
  3. The orange fill follows the flight. Four styles (play({ fill }), ?introFill= or data-fill on the
     script tag): "ripple" (default) spreads from where the ship lands; "wake" spreads outward from
     the white swoops as they are drawn; "swirl" paints in behind the ship and closes the circle;
     "rings" sweeps round in rings, outer to inner, like orbits tightening.
  4. The finished mark flies into place on the page.

  Plays on a fresh visit or a refresh, not when arriving from another page of the site. ?intro=1 forces it, ?intro=0 skips it, ?introSpeed=0.25 slows it.
  Skipped for prefers-reduced-motion and inside the design canvas iframes.
  window.CoIntro.play({ speed, land, at }) replays it (designs/intro.html); `at` freezes one moment.
*/
(function () {
  var script = document.currentScript;
  var logoUrl = new URL("../assets/brand/logo-currentcolor.svg", script.src).href;
  var root = document.documentElement;
  var NS = "http://www.w3.org/2000/svg";
  var FILLS = ["ripple", "wake", "swirl", "rings"];

  // Timeline in ms at speed 1.
  var T = {
    outline: [0, 800],
    flight: [300, 3600],
    close: [3600, 4250],    // the fill finishes the circle after the ship lands
    finish: [4100, 4800],   // a sheen crosses the finished sphere and a glow blooms behind it
    fly: [4850, 5550],
  };

  // Cubic-bezier easing, the same curves CSS and Figma use.
  function bezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    var cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    var X = function (t) { return ((ax * t + bx) * t + cx) * t; };
    var dX = function (t) { return (3 * ax * t + 2 * bx) * t + cx; };
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 8; i++) { var e = X(t) - x, d = dX(t); if (Math.abs(e) < 1e-5 || !d) break; t -= e / d; }
      return ((ay * t + by) * t + cy) * t;
    };
  }
  var EASE = {
    draw: bezier(0.65, 0, 0.35, 1),   // the pen line
    flight: bezier(0.4, 0, 0.32, 1),  // builds speed, cruises, and arrives with some momentum
    close: bezier(0.4, 0, 0.2, 1),    // the fill closing the circle
    fly: bezier(0.7, 0, 0.18, 1),     // the mark gliding into the page
  };
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var phase = function (now, p) { return clamp((now - p[0]) / (p[1] - p[0])); };
  var reduced = function () { return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; };

  var markupPromise = null;
  function loadMarkup() {
    markupPromise = markupPromise || fetch(logoUrl, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error("logo"); return r.text(); });
    return markupPromise;
  }

  function play(opts) {
    opts = opts || {};
    var speed = opts.speed > 0 ? opts.speed : 1;
    var land = opts.land !== false;
    var hidePage = opts.hidePage !== false;
    var done = opts.onDone || function () {};
    if (hidePage) root.classList.add("co-intro-running");
    // Stays on after the intro, so a page can skip entrance motion on the element the mark lands in.
    root.classList.add("co-intro-played");

    function cleanup() { root.classList.remove("co-intro-running", "co-intro-reveal"); }
    return loadMarkup().then(run, function () { cleanup(); done(); });

    function run(markup) {
      var overlay = document.createElement("div");
      overlay.className = "co-intro";
      overlay.setAttribute("role", "presentation");
      overlay.innerHTML = markup.replace(/co-cut/g, "co-intro-cut") + '<button class="co-intro-skip" type="button">Skip intro</button>';
      document.body.appendChild(overlay);

      var svg = overlay.querySelector("svg");
      svg.classList.add("co-intro-mark");
      svg.setAttribute("aria-hidden", "true");
      svg.removeAttribute("role");
      svg.style.overflow = "visible"; // the flight starts outside the logo's box

      var finished = false;
      function finish() {
        if (finished) return;
        finished = true;
        cleanup();
        overlay.remove();
        document.removeEventListener("keydown", onKey);
        done();
      }
      function onKey(e) { if (e.key === "Escape") finish(); }
      overlay.addEventListener("click", finish);
      document.addEventListener("keydown", onKey);

      var el = function (tag, attrs) { var n = document.createElementNS(NS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); return n; };
      var defs = svg.querySelector("defs");
      var sphere = svg.querySelector(".co-sphere");
      var circles = sphere.querySelectorAll("circle");
      var fill = circles[0], outline = circles[1];
      var lines = Array.prototype.slice.call(svg.querySelectorAll(".co-line"));
      var neck = svg.querySelector(".co-neck");
      var ship = svg.querySelector(".co-ship");
      var rider = svg.querySelector(".co-line-b");
      var cx = +fill.getAttribute("cx"), cy = +fill.getAttribute("cy"), r = +fill.getAttribute("r");

      // A disc of night inside the outline, so the ship can pass behind the sphere.
      var disc = el("circle", { cx: cx, cy: cy, r: r - 2, fill: "var(--intro-bg, #050608)" });
      svg.insertBefore(disc, sphere);
      // The flying ship has a back copy under the disc and a front copy over everything.
      var flyerBack = ship.cloneNode(true);
      svg.insertBefore(flyerBack, disc);
      var flyer = ship.cloneNode(true);
      svg.insertBefore(flyer, ship);

      // ---- The flight path: one curl that only ever turns one way. ----
      var unit = function (a, b) { var dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1; return { x: dx / l, y: dy / l }; };
      var riderLen = rider.getTotalLength();
      var tip = rider.getPointAtLength(0), tipDir = unit(tip, rider.getPointAtLength(6));
      var neckPt = rider.getPointAtLength(riderLen);
      // The ship's tail is the point that rides the path: the swoops grow out of it. It ends exactly
      // where the trails meet the ship in the logo. REST is the ship's resting heading (tail to nose).
      var TAIL = { x: neckPt.x, y: neckPt.y }, REST = { x: -0.792, y: -0.61 };
      var f2 = function (n) { return n.toFixed(1); };
      // In from the right just above the sphere, behind it across the top, round the left edge, and
      // into the feather's tip on the feather's own heading.
      // The curl round the left edge is long and wide, so the turn is gradual even at cruising speed.
      var LEAD_IN = "M 1320 96 C 800 96 420 104 250 150 C 120 185 " +
        f2(tip.x - tipDir.x * 130) + " " + f2(tip.y - tipDir.y * 130) + " " + f2(tip.x) + " " + f2(tip.y);
      // After the trail, up and left into the resting place on the ship's own heading.
      // The neck sits almost straight above the trail's end, but the ship rests pointing up and left, so
      // to arrive on that heading by flying it has to come in from the lower right. The flight leaves the
      // trail where the trail heads up and to the right, swings out wide past the swoops, and comes back
      // round to the left into the neck, turning the same way the whole time.
      var heading = function (at) { var a1 = rider.getPointAtLength(Math.max(0, at - 4)), a2 = rider.getPointAtLength(Math.min(riderLen, at + 4)); return Math.atan2(a2.y - a1.y, a2.x - a1.x) * 180 / Math.PI; };
      var cut = riderLen;
      while (cut > riderLen * 0.4 && heading(cut) < -62) cut -= 2;
      var along = [];
      for (var al = 4; al <= cut; al += 4) { var ap = rider.getPointAtLength(al); along.push(f2(ap.x) + " " + f2(ap.y)); }
      var cutPt = rider.getPointAtLength(cut), cutDir = unit(rider.getPointAtLength(cut - 6), cutPt);
      var reach = Math.hypot(TAIL.x - cutPt.x, TAIL.y - cutPt.y);
      var TO_NECK = " C " + f2(cutPt.x + cutDir.x * reach * 0.77) + " " + f2(cutPt.y + cutDir.y * reach * 0.77) + " " +
        f2(TAIL.x - REST.x * reach * 0.2) + " " + f2(TAIL.y - REST.y * reach * 0.2) + " " + f2(TAIL.x) + " " + f2(TAIL.y);
      var lead = el("path", { d: LEAD_IN }), flight = el("path", { d: LEAD_IN + " L " + along.join(" L ") + TO_NECK });
      defs.appendChild(lead); defs.appendChild(flight); // measured, never drawn
      var leadLen = lead.getTotalLength();
      var total = flight.getTotalLength();

      // Pre-sample the path. Positions get only a whisper of smoothing, so the ship stays on the real
      // trail and never drifts over the sphere; the heading is smoothed hard, which is what stops jitter.
      // The first and last samples stay exactly where they are.
      var N = 720, P = [], i, k;
      for (i = 0; i <= N; i++) { var q = flight.getPointAtLength(total * i / N); P.push([q.x, q.y]); }
      for (var pass = 0; pass < 4; pass++) {
        var S = P.map(function (v) { return v.slice(); });
        for (i = 1; i < N; i++) for (k = 0; k < 2; k++) S[i][k] = (P[i - 1][k] + 2 * P[i][k] + P[i + 1][k]) / 4;
        P = S;
      }
      var W = 24, H = [];
      for (i = 0; i <= N; i++) {
        var lo = P[Math.max(0, i - W)], hi = P[Math.min(N, i + W)];
        H.push(Math.atan2(hi[1] - lo[1], hi[0] - lo[0]) * 180 / Math.PI);
      }
      for (i = 1; i <= N; i++) { while (H[i] - H[i - 1] > 180) H[i] -= 360; while (H[i] - H[i - 1] < -180) H[i] += 360; }
      for (var pass2 = 0; pass2 < 24; pass2++) {
        var HS = H.slice();
        for (i = 1; i < N; i++) HS[i] = (H[i - 1] + 2 * H[i] + H[i + 1]) / 4;
        H = HS;
      }
      var restHeading = Math.atan2(REST.y, REST.x) * 180 / Math.PI;
      // The path already ends on the resting heading; this just removes the tiny difference the
      // smoothing window leaves over the last few samples.
      for (i = Math.floor(N * 0.96); i <= N; i++) {
        var w = (i - N * 0.96) / (N * 0.04);
        H[i] += (restHeading - H[i]) * w * w * (3 - 2 * w);
      }
      // Pace the flight by distance plus turning, so the ship eases off through tight curves and
      // picks up again on the straights, like banking. Progress maps to this "effort", then back to
      // a distance along the path.
      var TURN_COST = 4.5; // path units per degree of turn
      var effort = [0];
      for (i = 1; i <= N; i++) effort.push(effort[i - 1] + total / N + TURN_COST * Math.abs(H[i] - H[i - 1]));
      var effortTotal = effort[N];
      var distanceAt = function (e) {
        var lo2 = 0, hi2 = N;
        while (hi2 - lo2 > 1) { var mid = (lo2 + hi2) >> 1; if (effort[mid] < e) lo2 = mid; else hi2 = mid; }
        var span = effort[hi2] - effort[lo2] || 1;
        return total * (lo2 + (e - effort[lo2]) / span) / N;
      };
      var sample = function (s) {
        var x = Math.max(0, Math.min(N, s / total * N)), j = Math.min(N - 1, Math.floor(x)), f = x - j;
        return { x: P[j][0] + (P[j + 1][0] - P[j][0]) * f, y: P[j][1] + (P[j + 1][1] - P[j][1]) * f, a: H[j] + (H[j + 1] - H[j]) * f };
      };
      function place(node, p, turn, scale) {
        node.setAttribute("transform", "translate(" + p.x + " " + p.y + ") rotate(" + turn + ") scale(" + scale + ") translate(" + (-TAIL.x) + " " + (-TAIL.y) + ")");
      }

      // The orange path, on the exact flight path (not the smoothed samples), starting only once the
      // ship is fully clear of the sphere's outline, and drawn behind the white swoops.
      var clear = r + 12, wasInside = false, sEmerge = total;
      for (var sl = 0; sl <= total; sl += 2) {
        var pt = flight.getPointAtLength(sl), inside = Math.hypot(pt.x - cx, pt.y - cy) < clear;
        if (inside) wasInside = true; else if (wasInside) { sEmerge = sl; break; }
      }
      // Each bit of it lasts TRAIL_MS, fading softly toward its far end (three stacked segments), so once
      // the ship lands the trail retracts into it and is gone.
      var TRAIL_MS = 660, TRAIL = [{ lag: 0, to: 220, o: 1 }, { lag: 220, to: 440, o: 0.55 }, { lag: 440, to: TRAIL_MS, o: 0.22 }];
      var trailBefore = svg.querySelector(".co-trails");
      var exhaust = TRAIL.map(function (seg) {
        var e = el("path", { d: flight.getAttribute("d"), fill: "none", stroke: "#F56600", "stroke-width": 6, "stroke-linecap": "round", opacity: seg.o });
        e.style.visibility = "hidden";
        svg.insertBefore(e, trailBefore);
        return e;
      });
      var sAt = function (tt) { return distanceAt(effortTotal * EASE.flight(phase(tt, T.flight))); };

      // Pen-line drawing for the outline and the feathers.
      var outlineLen = 2 * Math.PI * r;
      outline.style.strokeDasharray = outlineLen;
      // The logo's outline has gaps where the feathers cross it. The intro first draws a complete
      // circle (an unmasked copy on top), and only lets the gaps open as the feathers are drawn.
      var fullOutline = outline.cloneNode(true);
      svg.insertBefore(fullOutline, sphere.nextSibling);
      var lens = lines.map(function (l) { var n = l.getTotalLength(); l.style.strokeDasharray = n; l.style.strokeDashoffset = n; return n; });
      var delays = [0, 0, 0.12, 0.12, 0.24, 0.24];

      // ---- The swirl fill: orange paints into the sphere round the centre, starting where the ship
      // joins the trail. It is the logo's own fill circle clipped to a wedge with curved edges; a
      // lighter band rides its leading edge.
      var sweepFrom = Math.atan2(tip.y - cy, tip.x - cx) * 180 / Math.PI;
      var R = r + 12;
      // The wedge's edges curve like the swoops (a swirl, not a pie slice): each runs from the centre
      // to the rim bending back the way the ship has come.
      var SWIRL = 32; // degrees the edge bends back by
      var polar = function (a, rad) { return [cx + rad * Math.cos(a * Math.PI / 180), cy + rad * Math.sin(a * Math.PI / 180)]; };
      var wedge = function (from, to) { // from > to: the arc runs from `from` back round to `to`
        var span = from - to;
        if (span <= 0.05) return "M" + cx + " " + cy + "Z";
        if (span >= 359.9) return "M" + (cx - R) + " " + cy + " a" + R + " " + R + " 0 1 0 " + 2 * R + " 0 a" + R + " " + R + " 0 1 0 " + -2 * R + " 0Z";
        var p0 = polar(from, R), p1 = polar(to, R);
        var c0 = polar(from + SWIRL, R * 0.55), c1 = polar(to + SWIRL, R * 0.55);
        return "M" + cx + " " + cy + " Q" + f2(c0[0]) + " " + f2(c0[1]) + " " + f2(p0[0]) + " " + f2(p0[1]) +
          " A" + R + " " + R + " 0 " + (span > 180 ? 1 : 0) + " 0 " + f2(p1[0]) + " " + f2(p1[1]) +
          " Q" + f2(c1[0]) + " " + f2(c1[1]) + " " + cx + " " + cy + "Z";
      };
      var sweepClip = el("clipPath", { id: "co-intro-sweep" }), sweepShape = el("path", { d: wedge(0, 0) });
      sweepClip.appendChild(sweepShape);
      var edgeClip = el("clipPath", { id: "co-intro-edge" }), edgeShape = el("path", { d: wedge(0, 0) });
      edgeClip.appendChild(edgeShape);
      defs.appendChild(sweepClip); defs.appendChild(edgeClip);
      var edge = el("circle", { cx: cx, cy: cy, r: r, fill: "#FF9A4D", "clip-path": "url(#co-intro-edge)" });
      sphere.insertBefore(edge, outline);

      // ---- The other fill styles. Each sets up its shapes here and returns its per-frame update. ----
      var mode = opts.fill || new URLSearchParams(location.search).get("introFill") || script.getAttribute("data-fill") || "ripple";
      if (FILLS.indexOf(mode) < 0) mode = "ripple";
      var BIG = { x: cx - 3 * r, y: cy - 3 * r, width: 6 * r, height: 6 * r };
      var sphereClip = el("clipPath", { id: "co-intro-sphere" });
      sphereClip.appendChild(el("circle", { cx: cx, cy: cy, r: r }));
      defs.appendChild(sphereClip);
      var updateFill;

      if (mode === "swirl") {
        fill.setAttribute("clip-path", "url(#co-intro-sweep)");
        // The sweep starts as the ship reaches the trail and then circles at its own steady pace all the
        // way round (it does not wait for the ship as it slows to land), easing only into the close.
        var tTip = T.flight[0];
        while (tTip < T.flight[1] && sAt(tTip) < leadLen) tTip += 10;
        var SWEEP = [tTip + 120, T.close[1]];
        var sweepEase = bezier(0.3, 0, 0.6, 1);
        updateFill = function (t) {
          var cl = sweepEase(phase(t, SWEEP));
          var front = sweepFrom - 360 * cl;
          sweepShape.setAttribute("d", wedge(sweepFrom, front));
          // The lighter band rides just behind the leading edge, and fades as the circle closes.
          edgeShape.setAttribute("d", wedge(Math.min(sweepFrom, front + 14), front));
          edge.style.opacity = 0.8 * (1 - clamp((cl - 0.85) / 0.15)); // fades only as the circle closes
        };
      } else {
        edge.remove();
      }

      if (mode === "wake") {
        // A mask of the swoops themselves, drawn as they are drawn and thickening over time, so the
        // orange spreads outward from them until it floods the sphere.
        var wake = el("mask", { id: "co-intro-wake", maskUnits: "userSpaceOnUse", x: BIG.x, y: BIG.y, width: BIG.width, height: BIG.height });
        wake.appendChild(el("rect", { x: BIG.x, y: BIG.y, width: BIG.width, height: BIG.height, fill: "#000" }));
        var wakeLines = lines.map(function (l) {
          var c = el("path", { d: l.getAttribute("d"), fill: "none", stroke: "#fff", "stroke-linecap": "round", "stroke-linejoin": "round" });
          wake.appendChild(c);
          return c;
        });
        defs.appendChild(wake);
        fill.setAttribute("mask", "url(#co-intro-wake)");
        var WAKE = [2500, 4350], wakeEase = bezier(0.65, 0, 0.35, 1);
        updateFill = function (t) {
          var width = 14 + 640 * wakeEase(phase(t, WAKE));
          wakeLines.forEach(function (c, n) {
            c.setAttribute("stroke-width", width);
            c.style.strokeDasharray = lines[n].style.strokeDasharray;
            c.style.strokeDashoffset = lines[n].style.strokeDashoffset;
          });
        };
      }

      if (mode === "ripple") {
        // A disc of orange spreads from the point on the rim where the ship lands, with a bright ring
        // running ahead of it.
        var toward = unit({ x: cx, y: cy }, TAIL);
        var hit = { x: cx + toward.x * r, y: cy + toward.y * r };
        var rippleClip = el("clipPath", { id: "co-intro-ripple" }), rippleDisc = el("circle", { cx: hit.x, cy: hit.y, r: 0 });
        rippleClip.appendChild(rippleDisc);
        defs.appendChild(rippleClip);
        fill.setAttribute("clip-path", "url(#co-intro-ripple)");
        var ring = el("circle", { cx: hit.x, cy: hit.y, r: 0, fill: "none", stroke: "#FFB27A", "stroke-width": 16, "clip-path": "url(#co-intro-sphere)" });
        sphere.insertBefore(ring, outline);
        var RIPPLE = [3350, 4300];
        updateFill = function (t) {
          var k = phase(t, RIPPLE), e = EASE.close(k);
          rippleDisc.setAttribute("r", 2.05 * r * e);
          ring.setAttribute("r", 2.05 * r * EASE.close(Math.min(1, k * 1.12)) + 10);
          ring.style.opacity = k > 0 ? 0.85 * (1 - k) : 0;
        };
      }

      if (mode === "rings") {
        // Five rings, outer first, each sweeping round from where the ship joined the trail.
        var RINGS = 5, ringsClip = el("clipPath", { id: "co-intro-rings" });
        var bands = [];
        for (var rb = 0; rb < RINGS; rb++) {
          var outer = rb === 0 ? R : r * (1 - rb / RINGS) + 1, inner = rb === RINGS - 1 ? 0 : r * (1 - (rb + 1) / RINGS) - 1;
          var band = el("path", { d: "M" + cx + " " + cy + "Z", "clip-rule": "evenodd" });
          ringsClip.appendChild(band);
          bands.push({ node: band, outer: outer, inner: inner, start: 2300 + rb * 320, dur: 950 });
        }
        defs.appendChild(ringsClip);
        fill.setAttribute("clip-path", "url(#co-intro-rings)");
        var annulus = function (ro, ri, from, to) {
          var span = from - to;
          if (span <= 0.05) return "M" + cx + " " + cy + "Z";
          if (span >= 359.9) {
            var circle = function (rad) { return "M" + (cx - rad) + " " + cy + " a" + rad + " " + rad + " 0 1 0 " + 2 * rad + " 0 a" + rad + " " + rad + " 0 1 0 " + -2 * rad + " 0Z"; };
            return circle(ro) + (ri > 0 ? " " + circle(ri) : "");
          }
          var o0 = polar(from, ro), o1 = polar(to, ro), i1 = polar(to, ri), i0 = polar(from, ri), large = span > 180 ? 1 : 0;
          return "M" + f2(o0[0]) + " " + f2(o0[1]) + " A" + ro + " " + ro + " 0 " + large + " 0 " + f2(o1[0]) + " " + f2(o1[1]) +
            " L" + f2(i1[0]) + " " + f2(i1[1]) + (ri > 0 ? " A" + ri + " " + ri + " 0 " + large + " 1 " + f2(i0[0]) + " " + f2(i0[1]) : "") + "Z";
        };
        updateFill = function (t) {
          bands.forEach(function (b) {
            var e = EASE.close(phase(t, [b.start, b.start + b.dur]));
            b.node.setAttribute("d", annulus(b.outer, b.inner, sweepFrom, sweepFrom - 360 * e));
          });
        };
      }

      // ---- The finish: a band of light sweeps across the sphere as it completes, and a soft orange
      // glow blooms behind it and fades. ----
      var sheenGrad = el("linearGradient", { id: "co-intro-sheen-grad", x1: 0, y1: 0, x2: 1, y2: 0 });
      [[0, 0], [0.5, 0.7], [1, 0]].forEach(function (st) { sheenGrad.appendChild(el("stop", { offset: st[0], "stop-color": "#fff", "stop-opacity": st[1] })); });
      var glowBlur = el("filter", { id: "co-intro-glow", x: "-50%", y: "-50%", width: "200%", height: "200%" });
      glowBlur.appendChild(el("feGaussianBlur", { stdDeviation: 26 }));
      defs.appendChild(sheenGrad); defs.appendChild(glowBlur);
      var sheenBand = el("rect", { x: -0.3 * r, y: cy - 1.6 * r, width: 0.6 * r, height: 3.2 * r, fill: "url(#co-intro-sheen-grad)" });
      var sheen = el("g", { "clip-path": "url(#co-intro-sphere)" });
      sheen.appendChild(sheenBand);
      sphere.insertBefore(sheen, outline);
      var glow = el("circle", { cx: cx, cy: cy, r: r * 1.02, fill: "#F56600", filter: "url(#co-intro-glow)" });
      svg.insertBefore(glow, flyerBack); // behind everything, so it blooms round the edge
      sheen.style.opacity = 0;
      glow.style.opacity = 0;
      var sheenEase = bezier(0.45, 0, 0.2, 1);

      ship.style.opacity = 0;
      flyer.style.opacity = 0;
      flyerBack.style.opacity = 0;
      if (neck) neck.style.opacity = 0;

      var t0 = performance.now();
      var target = land ? document.querySelector("[data-logo-target]") : null;
      var flyFrom = null;

      function frame(now) {
        if (finished) return;
        var t = opts.at != null ? opts.at : (now - t0) * speed;

        // 1. The pen line.
        outline.style.strokeDashoffset = fullOutline.style.strokeDashoffset = outlineLen * (1 - EASE.draw(phase(t, T.outline)));

        // 2. The flight.
        var f = phase(t, T.flight);
        var s = distanceAt(effortTotal * EASE.flight(f));
        var p = sample(s);
        var turn = p.a - restHeading;
        var behind = s < leadLen;
        var depth = 0.74 + 0.26 * EASE.draw(clamp((s - leadLen * 0.72) / (leadLen * 0.28))); // smaller on the far side
        var started = f > 0, landed = f >= 1;
        place(flyer, p, turn, depth);
        place(flyerBack, p, turn, depth);
        flyer.style.opacity = started && !landed && !behind ? 1 : 0;
        flyerBack.style.opacity = started && !landed && behind ? 1 : 0;
        ship.style.opacity = landed ? 1 : 0;

        // The orange trail: from where the ship was TRAIL_MS ago up to where it is now, never before it
        // cleared the globe. Hidden when it has no length (a zero-length round cap would draw a dot).
        exhaust.forEach(function (e, n) {
          var seg = TRAIL[n];
          var a = Math.max(sEmerge, sAt(t - seg.to)), b = Math.max(sEmerge, sAt(t - seg.lag));
          e.style.strokeDasharray = Math.max(0, b - a) + " " + total * 3;
          e.style.strokeDashoffset = -a;
          e.style.visibility = b - a > 1 ? "visible" : "hidden";
        });
        if (neck) neck.style.opacity = EASE.close(phase(t, [T.flight[1] - 250, T.flight[1] + 150])); // appears as the ship settles onto the neck
        var tp = clamp((s - leadLen) / (total - leadLen));
        // The complete circle gives way to the logo's cut outline as the feathers are drawn over it.
        fullOutline.style.opacity = 1 - EASE.close(clamp((tp - 0.15) / 0.75));
        lines.forEach(function (l, n) { l.style.strokeDashoffset = lens[n] * (1 - clamp((tp - delays[n]) / (1 - delays[n]))); });

        // 3. The fill.
        updateFill(t, s);

        // The finish.
        var fz = phase(t, T.finish);
        var sx = cx - 1.7 * r + 3.4 * r * sheenEase(fz);
        sheenBand.setAttribute("transform", "rotate(-28 " + cx + " " + cy + ") translate(" + sx + " 0)");
        sheen.style.opacity = fz > 0 && fz < 1 ? 1 : 0;
        glow.style.opacity = 0.55 * Math.sin(Math.PI * fz);

        // 4. The mark glides into place on the page.
        var fl = phase(t, T.fly);
        if (fl > 0) {
          if (!flyFrom) { flyFrom = svg.getBoundingClientRect(); root.classList.add("co-intro-reveal"); }
          var k2 = EASE.fly(fl);
          var to = target ? contentRect(target, svg) : null;
          if (to && to.width) {
            var sc = 1 + (to.width / flyFrom.width - 1) * k2;
            svg.style.transform = "translate(" + (to.left - flyFrom.left) * k2 + "px," + (to.top - flyFrom.top) * k2 + "px) scale(" + sc + ")";
          } else {
            svg.style.opacity = 1 - k2;
          }
          overlay.style.backgroundColor = "rgba(5,6,8," + (1 - k2) + ")";
          overlay.querySelector(".co-intro-skip").style.opacity = 1 - k2;
        }
        if (t >= T.fly[1] + 60) { finish(); return; }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
  }

  // Where the mark is actually drawn inside the target (an <img> letterboxes the taller-than-wide logo).
  function contentRect(target, svg) {
    var b = target.getBoundingClientRect();
    var vb = svg.viewBox.baseVal, aspect = vb.width / vb.height;
    var w = Math.min(b.width, b.height * aspect), h = w / aspect;
    return { left: b.left + (b.width - w) / 2, top: b.top + (b.height - h) / 2, width: w, height: h };
  }

  window.CoIntro = { play: play, fills: FILLS };

  // Autoplay once per session.
  var params = new URLSearchParams(location.search);
  var forced = params.get("intro") === "1";
  var framed = window.self !== window.top;
  // Arriving from another page of the site (the header logo, a link, back/forward) skips it;
  // a fresh visit or a refresh plays it.
  var nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
  var fromSite = false;
  try { fromSite = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) {}
  var seen = nav.type === "back_forward" || (nav.type !== "reload" && fromSite);
  if (script.hasAttribute("data-no-autoplay")) return;
  if (!forced && (params.get("intro") === "0" || reduced() || framed || seen)) return;

  root.classList.add("co-intro-running", "co-intro-played");
  var start = function () {
    play({ speed: parseFloat(params.get("introSpeed")) || 1 });
  };
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
