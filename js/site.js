/* Shared behavior: mobile navigation and scroll reveals. */
(function () {
  document.documentElement.classList.remove("no-js");

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });

    // Close the menu with Escape, and when a link is chosen on a phone.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && nav.classList.contains("is-open")) setMenu(false);
    });

    // Reset if the window grows past the phone layout while the menu is open.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && nav.classList.contains("is-open")) setMenu(false);
    });
  }

  // Fade sections in as they scroll into view.
  var revealed = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealed.forEach(function (node) { node.classList.add("is-visible"); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealed.forEach(function (node) { observer.observe(node); });
})();
