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
