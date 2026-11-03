/* Design E behaviour: entrances and the fill-in payload sentence. */
(function () {
  var parts = document.querySelectorAll(".rise, .bleed");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    parts.forEach(function (p) { io.observe(p); });
  } else {
    parts.forEach(function (p) { p.classList.add("in"); });
  }

  // The sentence: CubeSats are built from 10 cm units; one unit is kept for power and radio.
  var form = document.getElementById("fit-form");
  if (!form) return;
  var out = document.getElementById("fit-out");
  var send = document.getElementById("fit-send");
  var INNER = 9.5;

  function val(n) { var v = parseFloat(form.elements[n].value); return isFinite(v) && v > 0 ? v : null; }

  function size(l, w, h) {
    var a = Math.min(l, w), b = Math.max(l, w), stack = Math.ceil(h / 10);
    if (b <= INNER) return stack + 1 <= 3 ? (stack + 1) + "U" : "6U";
    if (a <= INNER && b <= INNER * 2 + 0.5) { var t = stack * 2 + 2; return t <= 6 ? "6U" : t <= 12 ? "12U" : null; }
    return null;
  }

  function update() {
    var l = val("l"), w = val("w"), h = val("h");
    // Inputs grow with their numbers so the sentence keeps reading as a sentence.
    ["l", "w", "h"].forEach(function (n) { var el = form.elements[n]; el.style.width = Math.max(1.4, String(el.value).length * 0.62 + 0.4) + "em"; });
    var s = l && w && h ? size(l, w, h) : null;
    out.textContent = !l || !w || !h ? "a size we can work out once you fill it in" : s ? "a " + s + " CubeSat" : "bigger than a standard CubeSat frame, so write to us about the larger platform";
    var body = "Payload size: " + l + " x " + w + " x " + h + " cm\nRough fit from the website: " + (s ? s + " CubeSat" : "larger than a standard CubeSat") + "\n\nWhat it measures:\n";
    send.href = "mailto:cubesat@clemson.edu?subject=" + encodeURIComponent("[Clemson Orbital] Payload idea") + "&body=" + encodeURIComponent(body);
  }
  form.addEventListener("input", update);
  update();
})();
