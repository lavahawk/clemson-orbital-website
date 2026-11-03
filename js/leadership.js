/* Renders the leadership cards from window.LEADERSHIP (data/leadership.js). */
(function () {
  var container = document.getElementById("leaders");
  if (!container || !Array.isArray(window.LEADERSHIP)) return;

  // Pages outside the site root (design previews) point this at the shared folder.
  var HEADSHOT_DIR = container.getAttribute("data-headshot-dir") || "assets/headshots/";

  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) { return part.charAt(0).toUpperCase(); })
      .join("");
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // Contact links, shown under the name (revealed on hover where the pointer can hover).
  var LINKS = window.LEADERSHIP_LINKS || {};
  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04c-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13a2.06 2.06 0 0 1 0 4.13m1.78 13.02H3.56V9h3.56zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z"/></svg>',
    site: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7l-9 5.7a2 2 0 0 1-2 0L2 7"/></svg>'
  };

  function link(href, icon, label, external) {
    var a = el("a");
    a.href = href;
    a.innerHTML = ICONS[icon];
    a.appendChild(el("span", null, label));
    if (external) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  function buildLinks(info) {
    info = info || {};
    var box = el("div", "leader-links");
    if (info.linkedin) box.appendChild(link(info.linkedin, "linkedin", "LinkedIn", true));
    if (info.site) box.appendChild(link(info.site, "site", info.site.replace(/^https?:\/\//, "").replace(/\/$/, ""), true));
    if (!info.linkedin && !info.site) box.appendChild(link("contact.html#message", "mail", "message the team"));
    return box;
  }

  function buildCard(person) {
    var info = LINKS[person.name];
    if (info && info.name) person = Object.assign({}, person, { name: info.name });
    var card = el("article", "leader");

    var photo = el("div", "leader-photo");
    if (person.headshot) {
      var img = el("img");
      img.src = HEADSHOT_DIR + person.headshot;
      img.alt = "Portrait of " + person.name;
      img.loading = "lazy";
      img.decoding = "async";
      // If the file is missing, fall back to initials instead of a broken image.
      img.onerror = function () {
        photo.replaceChildren(el("span", "initials", initials(person.name)));
      };
      photo.appendChild(img);
    } else {
      photo.appendChild(el("span", "initials", initials(person.name)));
    }

    var body = el("div", "leader-body");
    body.appendChild(el("h3", null, person.name));
    // Role and area are optional: a card shows only what its entry has.
    if (person.role) body.appendChild(el("div", "leader-role", person.role));
    if (person.area) body.appendChild(el("p", null, person.area));
    body.appendChild(buildLinks(info));

    card.appendChild(photo);
    card.appendChild(body);
    return card;
  }

  var fragment = document.createDocumentFragment();
  window.LEADERSHIP.forEach(function (person) {
    fragment.appendChild(buildCard(person));
  });

  container.replaceChildren(fragment);
})();
