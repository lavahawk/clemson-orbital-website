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

  function buildCard(person) {
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
