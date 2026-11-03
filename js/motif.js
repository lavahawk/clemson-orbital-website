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
    var h = hero.getBoundingClientRect(), w = parseFloat(cs.width);
    var shift = new DOMMatrix(cs.transform === "none" ? undefined : cs.transform).m42;
    var left = cs.left !== "auto" ? parseFloat(cs.left) : h.width - parseFloat(cs.right) - w;
    return { x: h.left + left + w / 2, y: h.top + parseFloat(cs.top) + shift + w / 2, r: w / 2 };
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
