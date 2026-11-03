/* Design D behaviour: the phone menu, entrances and the mission-stage accordion. */
(function () {
  // Phone menu: a full-screen list of the pages.
  var toggle = document.querySelector(".menu-toggle"), nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "close" : "menu";
    };
    toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });
    addEventListener("resize", function () { if (innerWidth > 900) setMenu(false); });
  }

  // Nav hover dots are orange; the ones that sit over the orange sphere turn white so they still show.
  var navLinks = document.querySelectorAll(".top nav a");
  function sphere() {
    var mark = document.querySelector(".hero-mark");
    if (mark) {
      // Home: the globe inside the logo (viewBox 36 0 520 580, sphere centre 305,306, radius 230).
      var m = mark.getBoundingClientRect(), s = m.width / 520;
      return { x: m.left + (305 - 36) * s, y: m.top + 306 * s, r: 230 * s };
    }
    var hero = document.querySelector(".page-hero");
    if (!hero) return null;
    var cs = getComputedStyle(hero, "::after");
    if (cs.position !== "absolute") return null;
    // Inner pages: the sphere inside the hero's logo box (viewBox 520 x 580, centre 269,306 from its corner, radius 230).
    var h = hero.getBoundingClientRect(), w = parseFloat(cs.width), bh = parseFloat(cs.height);
    var shift = parseFloat((cs.translate || "0 0").split(" ")[1]) || 0;
    var left = cs.left !== "auto" ? parseFloat(cs.left) : h.width - parseFloat(cs.right) - w;
    return { x: h.left + left + w * 269 / 520, y: h.top + parseFloat(cs.top) + shift + bh * 306 / 580, r: w * 230 / 520 };
  }
  function markDots() {
    var c = sphere();
    navLinks.forEach(function (a) {
      var r = a.getBoundingClientRect();
      var over = !!c && r.width > 0 && Math.hypot(r.left + r.width / 2 - c.x, r.bottom + 13 - c.y) < c.r;
      a.classList.toggle("on-orange", over);
    });
  }
  if (navLinks.length) {
    markDots();
    addEventListener("resize", markDots);
    addEventListener("load", markDots);
    // The sphere and logo drift into place on load; measure again once they've settled.
    setTimeout(markDots, 1500);
  }

  // Background stars: now and then one fades in somewhere, twinkles and goes out; about one in six is a shooting star.
  // Skipped for reduced motion, and paused while the tab is hidden.
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "animate" in Element.prototype) {
    var sky = document.createElement("div");
    sky.className = "sky";
    sky.setAttribute("aria-hidden", "true");
    document.body.appendChild(sky);
    var live = 0;
    var spawn = function () {
      if (!document.hidden && live < 10) {
        var star = document.createElement("i");
        var shooting = Math.random() < 1 / 6;
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * (shooting ? 50 : 100) + "vh";
        live++;
        var anim;
        if (shooting) {
          star.className = "shoot";
          var dx = 180 + Math.random() * 160;
          anim = star.animate([
            { opacity: 0, transform: "rotate(25deg) translateX(0) scaleX(0.2)" },
            { opacity: 1, offset: 0.2 },
            { opacity: 0, transform: "rotate(25deg) translateX(" + dx + "px) scaleX(1)" }
          ], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,0,0,1)" });
        } else {
          var size = 1.5 + Math.random() * 2;
          star.style.width = star.style.height = size + "px";
          anim = star.animate([
            { opacity: 0, transform: "scale(0.4)" },
            { opacity: 0.9, transform: "scale(1)", offset: 0.3 },
            { opacity: 0.35, offset: 0.55 },
            { opacity: 0.85, offset: 0.75 },
            { opacity: 0, transform: "scale(0.6)" }
          ], { duration: 3500 + Math.random() * 3000, easing: "ease-in-out" });
        }
        sky.appendChild(star);
        anim.onfinish = function () { star.remove(); live--; };
      }
      setTimeout(spawn, 1800 + Math.random() * 4200);
    };
    setTimeout(spawn, 1200);
  }

  // Entrances: each part rises once as its section enters. Content is visible without script.
  var parts = document.querySelectorAll(".rise, .shutter");
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

  // Accordion: one stage open at a time.
  var stages = document.querySelectorAll(".stage");
  stages.forEach(function (stage) {
    stage.addEventListener("click", function () {
      stages.forEach(function (s) { s.setAttribute("aria-expanded", String(s === stage)); });
    });
  });
})();
