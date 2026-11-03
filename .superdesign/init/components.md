# Components

Framework: none. Static multi-page HTML + one vanilla CSS file (css/styles.css) + vanilla JS. No component library. Shared primitives are CSS classes: .btn (.btn-primary, .btn-ghost), .card, .card-tag, .leader, .field, .bullets, .steps, .values.

## Primitive CSS (from css/styles.css)

### `css/styles.css`

```css
/* ==========================================================================
   Clemson Orbital - site styles
   Tokens live on :root. Change the palette here and the whole site follows.
   ========================================================================== */

:root {
  --bg: #0b0f17;
  --surface: #121a28;
  --surface-raised: #182238;
  --line: rgba(232, 236, 243, 0.12);
  --text: #e8ecf3;
  --muted: #9aa6ba;
  --accent: #f56600;      /* Clemson orange */
  --accent-ink: #1a0b00;  /* text on accent buttons */
  --cool: #8fb8ff;        /* orbital blue, used sparingly */

  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;

  --max: 1120px;
  --gutter: 16px;
  --radius: 14px;
  --header-h: 72px;
}

*,
*::before,
*::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  color-scheme: dark;
  scroll-padding-top: calc(var(--header-h) + 16px);
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }
a { color: var(--cool); text-underline-offset: 3px; }
a:hover { color: var(--text); }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

.skip-link {
  position: absolute;
  left: var(--gutter);
  top: -100px;
  background: var(--accent);
  color: var(--accent-ink);
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  z-index: 100;
}
.skip-link:focus { top: 12px; }

.wrap {
  width: min(100% - 2 * var(--gutter), var(--max));
  margin-inline: auto;
}

/* --- Typography --------------------------------------------------------- */

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.12;
  letter-spacing: -0.02em;
  margin: 0 0 0.5em;
  font-weight: 600;
}
h1 { font-size: clamp(2.4rem, 6vw, 4.25rem); }
h2 { font-size: clamp(1.8rem, 3.6vw, 2.6rem); }
h3 { font-size: 1.3rem; letter-spacing: -0.01em; }

p { margin: 0 0 1em; }
.lead { font-size: clamp(1.1rem, 2vw, 1.3rem); color: var(--muted); max-width: 60ch; }

.eyebrow {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.eyebrow::before {
  content: "";
  width: 24px;
  height: 1px;
  background: currentColor;
}

/* --- Header and navigation --------------------------------------------- */

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 15, 23, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.site-header .wrap {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: -0.01em;
}
.brand img { width: 32px; height: 32px; }
.brand:hover { color: var(--text); }

.site-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 4px;
}
.site-nav a {
  display: block;
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s, background 0.2s;
}
.site-nav a:hover { color: var(--text); background: var(--surface); }
.site-nav a[aria-current="page"] { color: var(--text); background: var(--surface-raised); }

.nav-toggle {
  display: none;
  background: none;
  border: 1px solid var(--line);
  color: var(--text);
  border-radius: 10px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
.nav-toggle svg { width: 22px; height: 22px; }

@media (max-width: 860px) {
  .nav-toggle { display: inline-flex; }
  .site-nav {
    position: absolute;
    top: var(--header-h);
    left: 0;
    right: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
    display: none;
    padding: 12px var(--gutter) 20px;
  }
  .site-nav.is-open { display: block; }
  .site-nav ul { flex-direction: column; gap: 2px; }
  .site-nav a { padding: 12px 14px; font-size: 1.05rem; }
}

/* --- Buttons ------------------------------------------------------------ */

.btn-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 2rem; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 22px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s, border-color 0.2s;
}
.btn:hover { transform: translateY(-1px); }
.btn-primary { background: var(--accent); color: var(--accent-ink); }
.btn-primary:hover { background: #ff7a1f; color: var(--accent-ink); }
.btn-ghost { border-color: var(--line); color: var(--text); background: transparent; }
.btn-ghost:hover { border-color: var(--muted); color: var(--text); }

/* --- Sections ----------------------------------------------------------- */

section { padding: clamp(64px, 10vw, 112px) 0; }
section.tight { padding: clamp(40px, 6vw, 64px) 0; }
section.band { background: var(--surface); border-block: 1px solid var(--line); }

.section-head { max-width: 680px; margin-bottom: 40px; }
.section-head p { color: var(--muted); }

/* --- Hero ---------------------------------------------------------------- */

.hero {
  position: relative;
  overflow: hidden;
  padding: clamp(72px, 12vw, 136px) 0 clamp(64px, 9vw, 104px);
  isolation: isolate;
}
.hero::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto auto;
  width: min(820px, 120vw);
  aspect-ratio: 1;
  background: radial-gradient(circle at 50% 50%, rgba(143, 184, 255, 0.14), transparent 62%);
  z-index: -1;
  pointer-events: none;
}
.hero h1 { max-width: 16ch; }
.hero .lead { margin-top: 0.4rem; }

.orbit-art {
  position: absolute;
  right: -180px;
  top: 40px;
  width: 620px;
  opacity: 0.55;
  z-index: -1;
  pointer-events: none;
}

@media (max-width: 860px) {
  .orbit-art { width: 420px; right: -160px; top: 120px; opacity: 0.35; }
}

/* --- Cards and grids ---------------------------------------------------- */

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px;
  display: flex;
  flex-direction: column;
}
.card p { color: var(--muted); margin-bottom: 0; }
.card .num {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--cool);
  letter-spacing: 0.08em;
  margin-bottom: 18px;
}
.card .card-link {
  margin-top: auto;
  padding-top: 20px;
  font-weight: 600;
  text-decoration: none;
  color: var(--text);
}
.card .card-link:hover { color: var(--accent); }

.card-tag {
  align-self: flex-start;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px 10px;
  margin-bottom: 16px;
}

/* --- Story / two-column ------------------------------------------------- */

.split {
  display: grid;
  gap: clamp(32px, 6vw, 80px);
  grid-template-columns: 1fr 1fr;
  align-items: start;
}
@media (max-width: 860px) { .split { grid-template-columns: 1fr; } }

.stack > * + * { margin-top: 1em; }

.cta-band {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
}
.cta-text { max-width: 52ch; }
.cta-text h2 { margin-bottom: 8px; }
.cta-text .lead { font-size: 1.02rem; margin: 0; }

.values { list-style: none; padding: 0; margin: 0; }
.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 32px; }
@media (max-width: 860px) { .values-grid { grid-template-columns: 1fr; } }
.values li {
  border-top: 1px solid var(--line);
  padding: 22px 0;
}
.values li:last-child { border-bottom: 1px solid var(--line); }
.values strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin-bottom: 4px;
}
.values span { color: var(--muted); }

/* --- Missions timeline -------------------------------------------------- */

.steps {
  counter-reset: step;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  border-top: 1px solid var(--line);
}
.steps li {
  counter-increment: step;
  padding: 24px 24px 8px 0;
}
.steps li::before {
  content: "0" counter(step);
  display: block;
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 12px;
}
.steps h3 { font-size: 1.15rem; }
.steps p { color: var(--muted); font-size: 0.97rem; }

/* --- Mission cards ------------------------------------------------------ */

.mission-status {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--cool);
  margin-top: auto;
  padding-top: 20px;
}

/* --- Research and advocacy lists ---------------------------------------- */

.bullets { list-style: none; padding: 0; margin: 0; }
.bullets li {
  padding: 12px 0 12px 28px;
  position: relative;
  color: var(--muted);
  border-bottom: 1px solid var(--line);
}
.bullets li:last-child { border-bottom: 0; }
.bullets li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--accent);
}
.bullets strong { color: var(--text); font-weight: 600; }

/* --- Leadership --------------------------------------------------------- */

.leaders {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
}

.leader {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.leader-photo {
  aspect-ratio: 4 / 5;
  background: linear-gradient(160deg, var(--surface-raised), var(--surface));
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}
.leader-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.leader-photo .initials {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 0.04em;
}
.leader-body { padding: 20px 22px 24px; }
.leader-body h3 { margin-bottom: 2px; font-size: 1.2rem; }
.leader-role {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--accent);
  letter-spacing: 0.04em;
  margin-bottom: 10px;
}
.leader-body p { color: var(--muted); font-size: 0.95rem; margin: 0; }

/* --- Contact form ------------------------------------------------------- */

.contact-grid {
  display: grid;
  gap: clamp(32px, 6vw, 72px);
  grid-template-columns: 0.8fr 1.2fr;
  align-items: start;
}
@media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; } }

.contact-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(24px, 4vw, 40px);
}

.form { display: grid; gap: 18px; grid-template-columns: 1fr 1fr; }
.form .full { grid-column: 1 / -1; }
@media (max-width: 600px) { .form { grid-template-columns: 1fr; } }

.field label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 6px;
}
.field input,
.field select,
.field textarea {
  width: 100%;
  font: inherit;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px 14px;
}
.field textarea { min-height: 150px; resize: vertical; }
.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(245, 102, 0, 0.2);
}
.hint { color: var(--muted); font-size: 0.85rem; margin-top: 6px; }

.form-status {
  min-height: 1.5em;
  font-size: 0.95rem;
  color: var(--muted);
  margin: 0;
}
.form-status.is-error { color: #ff8a80; }
.form-status.is-ok { color: #9be39b; }

.hp { position: absolute; left: -9999px; }

/* --- Footer ------------------------------------------------------------- */

.site-footer {
  border-top: 1px solid var(--line);
  padding: 48px 0 40px;
  color: var(--muted);
  font-size: 0.93rem;
}
.footer-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
}
.site-footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px 20px; }
.site-footer a { color: var(--muted); }
.site-footer a:hover { color: var(--text); }
.footer-note { margin-top: 28px; font-size: 0.85rem; }

/* --- Page header (inner pages) ----------------------------------------- */

.page-hero {
  padding: clamp(64px, 9vw, 104px) 0 clamp(36px, 5vw, 56px);
  border-bottom: 1px solid var(--line);
}
.page-hero h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); max-width: 20ch; }
.page-hero .lead { margin-bottom: 0; }

/* --- Motion ------------------------------------------------------------- */

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
```

## Leadership card renderer

### `js/leadership.js`

```js
/* Renders the leadership cards from window.LEADERSHIP (data/leadership.js). */
(function () {
  var container = document.getElementById("leaders");
  if (!container || !Array.isArray(window.LEADERSHIP)) return;

  var HEADSHOT_DIR = "assets/headshots/";

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
      img.alt = person.name;
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
    body.appendChild(el("div", "leader-role", person.role));
    body.appendChild(el("p", null, person.area));

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
```

### `data/leadership.js`

```js
/*
  Leadership roster for the Contact page.

  To update:
  1. Drop each headshot into assets/headshots/ (see the README there).
  2. Set `name`, `role`, `area`, and `headshot` below. The headshot value is the
     file name inside assets/headshots/, for example "jane-doe.jpg".
  3. If there is no headshot yet, leave `headshot` empty. Initials show instead.

  Entries marked `placeholder: true` are stand-ins. Delete the flag once the
  real name is filled in.
*/
window.LEADERSHIP = [
  {
    name: "Leader name",
    role: "President",
    area: "Overall direction, partnerships, and the team's priorities.",
    headshot: "",
    placeholder: true
  },
  {
    name: "Leader name",
    role: "Vice President",
    area: "Day-to-day operations, membership, and internal reviews.",
    headshot: "",
    placeholder: true
  },
  {
    name: "Leader name",
    role: "Mission Director",
    area: "Spacecraft design, integration, testing, and launch readiness.",
    headshot: "",
    placeholder: true
  },
  {
    name: "Leader name",
    role: "Research Lead",
    area: "Payload intake, research partnerships, and data handling.",
    headshot: "",
    placeholder: true
  },
  {
    name: "Leader name",
    role: "Outreach Lead",
    area: "Schools, community events, and regional advocacy.",
    headshot: "",
    placeholder: true
  }
];
```

## Contact form logic

### `js/contact.js`

```js
/*
  Contact form handling.

  Messages go to cubesat@clemson.edu.

  - If `endpoint` is set (a form service such as Formspree or a small backend
    that forwards to cubesat@clemson.edu), the form POSTs there as JSON.
  - If `endpoint` is empty, the form opens the visitor's email app with the
    message filled in, addressed to cubesat@clemson.edu. Nothing is stored.
*/
(function () {
  var CONFIG = {
    recipient: "cubesat@clemson.edu",
    endpoint: "" // e.g. "https://formspree.io/f/your-form-id"
  };

  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function readForm() {
    var data = new FormData(form);
    return {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      affiliation: String(data.get("affiliation") || "").trim(),
      topic: String(data.get("topic") || "").trim(),
      message: String(data.get("message") || "").trim(),
      honeypot: String(data.get("website") || "")
    };
  }

  function validate(values) {
    if (!values.name) return "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return "Please add a valid email address.";
    if (!values.topic) return "Please choose what this is about.";
    if (values.message.length < 10) return "Please add a short message so we know what you need.";
    return "";
  }

  function openMailClient(values) {
    var subject = "[Clemson Orbital] " + values.topic;
    var lines = ["Name: " + values.name, "Email: " + values.email];
    if (values.affiliation) lines.push("Affiliation: " + values.affiliation);
    lines.push("", values.message);
    var body = lines.join("\n");

    window.location.href =
      "mailto:" + CONFIG.recipient +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var values = readForm();

    // Honeypot: real visitors leave this empty.
    if (values.honeypot) return;

    var problem = validate(values);
    if (problem) {
      setStatus(problem, "error");
      return;
    }

    if (!CONFIG.endpoint) {
      openMailClient(values);
      setStatus("Opening your email app. If nothing opens, write to " + CONFIG.recipient + " directly.", "ok");
      return;
    }

    var submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    setStatus("Sending...");

    fetch(CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        affiliation: values.affiliation,
        topic: values.topic,
        message: values.message,
        _to: CONFIG.recipient
      })
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        setStatus("Thanks, your message is on its way to the team.", "ok");
      })
      .catch(function () {
        setStatus("Something went wrong. Please email " + CONFIG.recipient + " directly.", "error");
      })
      .finally(function () {
        submit.disabled = false;
      });
  });
})();
```
