// Builds the full six-page preview sites for design A (Campus Daylight) and B (Deep Space).
// Copy comes from .superdesign/copy.md. Run from the repo root:  node designs/tools/build-variants.js
// Output: designs/a-daylight/*.html and designs/b-deep-space/*.html (overwritten each run).
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const UP = "../../"; // from designs/<theme>/ back to the site root
const COORDS = "34.68° N, 82.84° W";
const PAGES = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["missions.html", "Missions"],
  ["research.html", "Research"],
  ["advocacy.html", "Advocacy"],
  ["contact.html", "Contact"],
];

const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="${UP}assets/icons/sprite.svg#i-${name}"></use></svg>`;
const pad = (n) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Content (verbatim from .superdesign/copy.md)                        */
/* ------------------------------------------------------------------ */

const HOME = {
  eyebrow: "Student aerospace at Clemson University",
  h1: ["Clemson's student space program, ", "built to fly."],
  lead: "Clemson Orbital started as Clemson CubeSat. We still build satellites, and we've taken on more: our own missions to orbit, a way for researchers to get experiments up there, and a louder voice for aerospace in South Carolina and the Southeast.",
  facts: [["Based in", "Clemson, SC"], ["Heritage:", "Clemson CubeSat"], ["Next mission:", "in design"]],
};

const CTA_GENERAL = { type: "cta", h2: "Got an experiment that needs orbit?", paras: ["Or a classroom that wants a visit, or a company that wants to sponsor a build. Write to the team and we'll tell you honestly whether it fits."], button: ["Get in touch", "contact.html#message"] };

const CONTENT = {
  "index.html": {
    title: "Clemson Orbital | Student aerospace at Clemson University",
    description: "Clemson Orbital grew out of Clemson CubeSat. Students at Clemson University build and fly missions to orbit, help researchers get experiments into space, and advocate for aerospace in South Carolina and the Southeast.",
    blocks: [
      { type: "cards", pillars: true, eyebrow: "What we do", h2: "Three jobs, and we try to do each one properly.", cols: 3, items: [
        { icon: "rocket", title: "Missions", body: "Student teams design and build spacecraft on campus, test them until they stop breaking, and operate them once they're in orbit.", link: ["How a mission works", "missions.html"] },
        { icon: "flask-conical", title: "Research", body: "A professor brings an experiment. We work out whether it fits, then handle what makes it flyable: power, mass, data, and the paperwork a launch provider wants.", link: ["Research areas", "research.html"] },
        { icon: "megaphone", title: "Advocacy", body: "Students here shouldn't have to leave the Southeast to work in space. We visit schools, meet employers, and make that case to the people who fund research in the state.", link: ["Our outreach", "advocacy.html"] },
      ] },
      { type: "split", diagram: true, eyebrow: "Where we came from", h2: "A CubeSat team that outgrew its name.", paras: ["Clemson CubeSat showed that a small group of students could build flight hardware, test it honestly, and keep it running after launch.", "Clemson Orbital keeps that team and its habits. The new name covers the bigger missions, the research partnerships, and the outreach we're adding on top."], link: ["Read our story", "about.html"] },
      CTA_GENERAL,
    ],
  },
  "about.html": {
    title: "About | Clemson Orbital",
    description: "Clemson Orbital is the same student team as Clemson CubeSat, with a wider job: our own missions, research in orbit, and aerospace advocacy in the Southeast.",
    hero: { eyebrow: "About", h1: "Same team as Clemson CubeSat, with a wider job.", lead: "We're students who want to build real spacecraft, and we think South Carolina should be one of the places where that happens.", icon: "orbit", photo: "Team photo" },
    blocks: [
      { type: "split", eyebrow: "Our story", h2: "Why “Orbital”", paras: ["Clemson CubeSat gave us the foundation: people who know how to design a small satellite, integrate it, and fly it.", "A mission keeps going after the spacecraft leaves the rocket. There are ground passes to schedule, data to clean up, researchers waiting on results, and a new class of students who'll inherit the next build. We picked a name that covers all of that.", "So we widened the scope. We still build satellites; we also plan larger missions, open our hardware to research, and speak up for aerospace in the Southeast, where plenty of good engineers currently leave to find this work."] },
      { type: "cards", eyebrow: "Values", h2: "How we work", cols: 3, items: [
        { icon: "rocket", title: "Build it to fly.", body: "A design isn't done until it survives vibration, thermal cycling, and the people who have to operate it. We test early and write down what broke." },
        { icon: "send", title: "Write it down.", body: "Reviews are open, documents stay current, and every lesson gets handed to the next team. If only one person understands a subsystem, it isn't finished." },
        { icon: "map-pin", title: "Keep the South in the room.", body: "Decisions about aerospace get made in a handful of places. We want students and companies from this region in those conversations, and we want to show the work can happen here." },
      ] },
      { type: "split", eyebrow: "Who can join", h2: "You don't need to know orbital mechanics yet.", paras: ["Most members are undergraduates in engineering, computing, and the sciences. Plenty joined without any space experience and learned it next to someone a semester ahead of them.", "We also work with faculty, grad students, local companies, and community groups. If you can help with a design review, a ground station, a school visit, or a funding conversation, we'd like to hear from you."], link: ["Contact our leadership", "contact.html"] },
      CTA_GENERAL,
    ],
  },
  "missions.html": {
    title: "Missions | Clemson Orbital",
    description: "How Clemson Orbital runs a mission, from the first requirements review to operations in orbit, and the programs we're working toward.",
    hero: { eyebrow: "Missions", h1: "Every mission starts on a whiteboard and ends in orbit.", lead: "A mission is the whole life of a spacecraft: the question it answers, the hardware that answers it, and the operations that keep it useful after launch.", icon: "rocket", photo: "Hardware photo" },
    blocks: [
      { type: "cards", eyebrow: "Lifecycle", h2: "Six phases, and each one ends in a review.", p: "We don't start a phase until the last one has a written record. Members and outside advisors can sit in on any review.", cols: 3, numbered: true, items: [
        { title: "Define", body: "Set the goal, the requirements, and what success looks like in plain terms." },
        { title: "Design", body: "Size the spacecraft, pick the subsystems, and check every interface before anyone cuts metal." },
        { title: "Build", body: "Fabricate, wire, and program, keeping drawings and the parts list current." },
        { title: "Test", body: "Vibration, thermal vacuum, and functional checks. Better to find failures on the bench." },
        { title: "Launch", body: "Prepare for integration with a launch provider and support the spacecraft through deployment." },
        { title: "Operate", body: "Command it, pull down the data, and get results to whoever asked for them." },
      ] },
      { type: "cards", eyebrow: "Programs", h2: "Where we're headed", p: "Details firm up as each mission passes review. “In development” means a plan, not a launch date.", cols: 3, items: [
        { icon: "satellite", chip: ["Flying", "live"], title: "Small satellite missions", body: "CubeSat-class spacecraft carrying student payloads and short research experiments.", meta: "details coming soon", featured: true },
        { icon: "orbit", chip: ["In development", "dev"], title: "Larger platform", body: "A bigger spacecraft that can carry several research payloads and run for longer.", meta: "concept and requirements" },
        { icon: "radio-tower", chip: ["Planned", ""], title: "Ground station network", body: "Partner sites around the state so we can hear the spacecraft on more passes.", meta: "planning" },
      ] },
      { type: "cta", h2: "Have a payload that needs orbit?", paras: ["We take a limited number of payloads from faculty, students, and partner organizations, and each one gets reviewed for safety, power, mass, and data before we commit.", "Send a short description. We'll tell you straight whether it fits."], button: ["Propose a payload", "contact.html#message"] },
    ],
  },
  "research.html": {
    title: "Research | Clemson Orbital",
    description: "Clemson Orbital helps researchers get experiments into orbit: we handle the mechanical fit, power, data, and safety reviews so faculty and students can fly their payloads.",
    hero: { eyebrow: "Research", h1: "A lab that has to survive a rocket launch.", lead: "Orbit gives researchers conditions that are hard to fake on the ground. We help get experiments there, run them safely, and bring the data home.", icon: "flask-conical", photo: "Lab photo" },
    blocks: [
      { type: "split", eyebrow: "How it works", h2: "You bring the question. We make it flyable.", paras: ["Researchers tell us what they need to measure. We handle the engineering around it: mechanical fit, power budget, data handling, and the safety reviews launch providers require.", "Students on a payload team see an experiment through every stage, and faculty get a flight platform they couldn't justify building alone."] },
      { type: "cards", eyebrow: "Areas", h2: "Where we focus", cols: 4, items: [
        { icon: "sun", title: "Space environment", body: "Radiation, thermal swings, and drag, measured in place to check the models engineers rely on." },
        { icon: "cpu", title: "Small satellite systems", body: "Attitude control, power, and software that has to run on very little hardware." },
        { icon: "scan-eye", title: "Sensing and imaging", body: "Payloads that look at Earth or near space, with an eye on data regional partners can use." },
        { icon: "radio-tower", title: "Communications", body: "Link budgets and ground stations for a spacecraft that's only overhead for a few minutes at a time." },
      ] },
      { type: "list", eyebrow: "Partner with us", h2: "Bring us a question worth testing.", button: ["Start a research conversation", "contact.html#message"], items: [
        { title: "Faculty and grad researchers", body: "Co-develop a payload and get the data your lab needs." },
        { title: "Undergraduate teams", body: "Join a project already underway, or pitch one that fits the platform." },
        { title: "Industry and agencies", body: "Sponsor a payload, donate components, or test hardware with us." },
      ] },
    ],
  },
  "advocacy.html": {
    title: "Advocacy | Clemson Orbital",
    description: "Clemson Orbital connects South Carolina students, schools, companies, and leaders, and makes the case for space work in the Southeast.",
    hero: { eyebrow: "Advocacy", h1: "Space work shouldn't require leaving the Southeast.", lead: "South Carolina has universities, manufacturers, and students who could build the next generation of space hardware. We connect them and make the case for investing here.", icon: "megaphone", photo: "Outreach photo" },
    blocks: [
      { type: "split", eyebrow: "Position", h2: "Why this region, and why now", paras: ["The space industry is spreading beyond its old hubs. Companies want engineers who can work on a real system from day one, and students need to see that those jobs can exist close to home.", "So our advocacy is practical. Students meet local employers, local employers sit in on our reviews, and our results go to the people deciding on research funding and workforce programs."] },
      { type: "cards", eyebrow: "Outreach", h2: "Four groups we work with", cols: 4, items: [
        { icon: "school", title: "Schools", body: "Visits and hands-on demos for kids who've never seen a satellite up close." },
        { icon: "users", title: "Communities", body: "Public talks and open events in Clemson and around the state." },
        { icon: "factory", title: "Industry", body: "Sponsorship, mentorship, and technical review from regional companies, plus an early look at the students they'll want to hire." },
        { icon: "landmark", title: "Policy", body: "Conversations with state and local leaders about research funding, workforce programs, and what space work needs here." },
      ] },
      { type: "list", eyebrow: "Get involved", h2: "Help us make the case.", button: ["Get in touch", "contact.html#message"], items: [
        { body: "Host a visit at your school, library, or community group." },
        { body: "Mentor or sponsor a student team or a specific outreach event." },
        { body: "Introduce us to someone who should be part of the conversation." },
      ] },
    ],
  },
  "contact.html": {
    title: "Contact | Clemson Orbital",
    description: "Meet the Clemson Orbital leadership team and send a message to cubesat@clemson.edu about joining, payloads, sponsorship, or outreach.",
    hero: { eyebrow: "Contact", h1: "Talk to the people running Clemson Orbital.", lead: "Our leadership team covers missions, research partnerships, outreach, and membership. Find the right person below, or use the form to reach all of us.", icon: "mail", photo: "Team photo" },
    blocks: [{ type: "leaders" }, { type: "form" }],
    scripts: [`${UP}data/leadership.js`, `${UP}js/leadership.js`, `${UP}js/contact.js`],
  },
};

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function navList(file) {
  return PAGES.map(([href, label]) => `          <li><a href="${href}"${href === file ? ' aria-current="page"' : ""}>${label}</a></li>`).join("\n");
}

const toggleButton = `<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon("menu").replace('class="icon"', 'class="icon icon-open"')}${icon("x").replace('class="icon"', 'class="icon icon-close"')}</button>`;

function head(theme, page) {
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="${theme.themeColor}">
  <link rel="icon" href="${UP}assets/logo.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${theme.fonts}" rel="stylesheet">
  <link rel="stylesheet" href="${theme.css}">
  <link rel="stylesheet" href="${UP}css/intro.css">
  <script src="${UP}js/intro.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
`;
}

function footer(page, extraScript = "") {
  const scripts = [...(page.scripts || []), `${UP}js/site.js`];
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot">
        <div>
          <a class="brand" href="index.html"><img src="${UP}assets/logo.svg" alt="" width="34" height="34" data-logo-target>Clemson Orbital</a>
          <p>Clemson, South Carolina<br><a href="mailto:cubesat@clemson.edu">cubesat@clemson.edu</a></p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul><li><a href="about.html">About</a></li><li><a href="missions.html">Missions</a></li><li><a href="research.html">Research</a></li></ul>
        </div>
        <div>
          <h2>Connect</h2>
          <ul><li><a href="advocacy.html">Advocacy</a></li><li><a href="contact.html">Contact</a></li><li><a href="contact.html#message">Get in touch</a></li></ul>
        </div>
      </div>
      <div class="base"><span>&copy; 2026 Clemson Orbital</span><span>Grew out of Clemson CubeSat.</span></div>
    </div>
  </footer>
${scripts.map((s) => `  <script src="${s}"></script>`).join("\n")}${extraScript}
</body>
</html>
`;
}

const leadersBlock = (headH2Html) => `
    <section class="section">
      <div class="wrap">
${headH2Html}
        <div class="leaders reveal" id="leaders" data-headshot-dir="${UP}assets/headshots/" aria-live="polite">
          <noscript><p>Leadership profiles need JavaScript to load. Email <a href="mailto:cubesat@clemson.edu">cubesat@clemson.edu</a> to reach the team.</p></noscript>
        </div>
      </div>
    </section>
`;

const formMarkup = `
          <div class="form-card reveal">
            <form class="form" id="contact-form" novalidate>
              <div class="field"><label for="name">Name</label><input id="name" name="name" type="text" autocomplete="name" required></div>
              <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required></div>
              <div class="field full"><label for="affiliation">Affiliation <span class="optional">(optional)</span></label><input id="affiliation" name="affiliation" type="text" placeholder="Student, department, company, school"></div>
              <div class="field full"><label for="topic">What's this about?</label>
                <select id="topic" name="topic" required>
                  <option value="">Choose one</option>
                  <option>Joining the team</option>
                  <option>Proposing a payload or research project</option>
                  <option>Sponsorship or partnership</option>
                  <option>Outreach or a school visit</option>
                  <option>Media or general question</option>
                </select>
              </div>
              <div class="field full"><label for="message-body">Message</label><textarea id="message-body" name="message" required placeholder="A few sentences is plenty. Tell us what you'd like to happen next."></textarea></div>
              <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
              <div class="form-actions full">
                <button class="btn btn-primary" type="submit">Send message ${icon("send")}</button>
                <p class="form-status" id="form-status" role="status"></p>
              </div>
            </form>
          </div>`;

const formIntro = `
          <div class="contact-intro reveal">
            <span class="eyebrow">Form</span>
            <h2>Send us a message</h2>
            <p>Students asking how to join, professors with a payload idea, companies thinking about sponsorship, schools that want a visit: it all lands with the same team at <a href="mailto:cubesat@clemson.edu">cubesat@clemson.edu</a>.</p>
            <ul class="notes">
              <li>${icon("mail")}<span>We usually reply within a week during the semester.</span></li>
              <li>${icon("flask-conical")}<span>Payload proposals get a safety, power, and mass review.</span></li>
              <li>${icon("map-pin")}<span>Clemson, South Carolina &middot; ${COORDS}</span></li>
            </ul>
          </div>`;

function cardHtml(item, i, block) {
  const n = block.numbered ? `<span class="card-n">${pad(i + 1)}</span>` : "";
  const ic = item.icon ? `<span class="card-icon">${icon(item.icon)}</span>` : "";
  const chip = item.chip ? `<span class="chip${item.chip[1] ? " chip-" + item.chip[1] : ""}">${item.chip[0]}</span>` : "";
  const top = chip || n ? `${chip || n}${ic}` : `<span class="card-n">${pad(i + 1)}</span>${ic}`;
  return `          <article class="card${item.featured ? " is-featured" : ""}">
            <div class="card-top">${top}</div>
            <h3>${item.title}</h3>
            <p>${item.body}</p>${item.meta ? `
            <p class="card-meta">Status: <b>${item.meta}</b></p>` : ""}${item.link ? `
            <a class="card-link" href="${item.link[1]}">${item.link[0]} ${icon("arrow-up-right")}</a>` : ""}
          </article>`;
}

function listHtml(block) {
  return `<ol class="list">
${block.items.map((it, i) => `            <li><span class="list-n">${pad(i + 1)}</span><div>${it.title ? `<strong>${it.title}</strong>` : ""}<p>${it.body}</p></div></li>`).join("\n")}
          </ol>`;
}

/* ------------------------------------------------------------------ */
/* Theme A: Campus Daylight                                            */
/* ------------------------------------------------------------------ */

const daylight = {
  dir: "designs/a-daylight",
  css: "daylight.css",
  themeColor: "#FBF7F1",
  fonts: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Figtree:wght@400;500;600;700&display=swap",

  header(file) {
    return `
  <header class="site-header">
    <div class="wrap">
      <div class="header-inner">
        <a class="brand" href="index.html"><img src="${UP}assets/logo.svg" alt="" width="34" height="34" data-logo-target>Clemson Orbital</a>
        <nav id="site-nav" class="site-nav" aria-label="Main">
          <ul>
${navList(file)}
          </ul>
        </nav>
        <a class="btn btn-primary header-cta" href="contact.html#message">Get in touch</a>
        ${toggleButton}
      </div>
    </div>
  </header>
`;
  },

  homeHero() {
    return `
    <section class="hero">
      <div class="wrap">
        <div class="hero-grid">
          <div>
            <span class="kicker"><i>&#9679;</i>${HOME.eyebrow}</span>
            <h1>${HOME.h1[0]}<em>${HOME.h1[1]}</em></h1>
            <p class="lead">${HOME.lead}</p>
            <div class="actions">
              <a class="btn btn-primary" href="missions.html">See our missions ${icon("arrow-right")}</a>
              <a class="btn btn-secondary" href="contact.html">Meet the team</a>
            </div>
          </div>
          <div class="collage" aria-hidden="true">
            <div class="photo big"><span class="cap">Team photo</span></div>
            <div class="photo purple"><span class="cap">Hardware photo</span></div>
            <div class="photo"><span class="cap">Clean room photo</span></div>
            <div class="badge"><img src="${UP}assets/logo.svg" alt=""><div><strong>Clemson, SC</strong><small>Heritage: Clemson CubeSat</small></div></div>
          </div>
        </div>
        <div class="facts">
${HOME.facts.map(([k, v], i) => `          <span class="fact">${i === 0 ? '<span class="dot"></span>' : ""}${k} <b>${v}</b></span>`).join("\n")}
        </div>
      </div>
    </section>
`;
  },

  pageHero(file, h) {
    const idx = PAGES.findIndex(([f]) => f === file);
    return `
    <section class="page-hero">
      <div class="wrap page-hero-grid">
        <div>
          <span class="kicker"><i>${idx + 1}</i>${h.eyebrow}</span>
          <h1>${h.h1}</h1>
          <p class="lead">${h.lead}</p>
        </div>
        <div class="hero-tile ${idx % 2 ? "tile-purple" : "tile-orange"}" aria-hidden="true">${icon(h.icon)}<span class="cap">${h.photo}</span></div>
      </div>
    </section>
`;
  },

  cards(block) {
    return `
    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">${block.eyebrow}</span>
          <h2>${block.h2}</h2>${block.p ? `
          <p>${block.p}</p>` : ""}
        </div>
        <div class="cards cols-${block.cols}${block.pillars ? " pillars" : ""} reveal">
${block.items.map((it, i) => cardHtml(it, i, block)).join("\n")}
        </div>
      </div>
    </section>
`;
  },

  split(block) {
    return `
    <section class="section">
      <div class="wrap">
        <div class="split reveal">
          <div>
            <span class="eyebrow">${block.eyebrow}</span>
            <h2>${block.h2}</h2>
          </div>
          <div class="split-body">
            ${block.paras.map((p) => `<p>${p}</p>`).join("\n            ")}${block.link ? `
            <a class="text-link" href="${block.link[1]}">${block.link[0]} ${icon("arrow-right")}</a>` : ""}
          </div>
        </div>
      </div>
    </section>
`;
  },

  list(block) {
    return `
    <section class="section">
      <div class="wrap">
        <div class="split reveal">
          <div>
            <span class="eyebrow">${block.eyebrow}</span>
            <h2>${block.h2}</h2>
            <div class="actions list-cta"><a class="btn btn-primary" href="${block.button[1]}">${block.button[0]} ${icon("arrow-right")}</a></div>
          </div>
          ${listHtml(block)}
        </div>
      </div>
    </section>
`;
  },

  cta(block) {
    return `
    <section class="section">
      <div class="wrap">
        <div class="cta-box reveal">
          <div>
            <h2>${block.h2}</h2>
            ${block.paras.map((p) => `<p>${p}</p>`).join("\n            ")}
          </div>
          <a class="btn btn-primary" href="${block.button[1]}">${block.button[0]} ${icon("arrow-right")}</a>
        </div>
      </div>
    </section>
`;
  },

  leaders() {
    return leadersBlock(`        <div class="section-head reveal">
          <span class="eyebrow">Leadership</span>
          <h2>Leadership</h2>
          <p>General questions go to everyone through the form below.</p>
        </div>`);
  },

  form() {
    return `
    <section class="section" id="message">
      <div class="wrap contact-grid">${formIntro}${formMarkup}
      </div>
    </section>
`;
  },

  extraScript: "",
};

/* ------------------------------------------------------------------ */
/* Theme B: Deep Space                                                 */
/* ------------------------------------------------------------------ */

let chapter = 0;
const numeral = () => `<span class="numeral" aria-hidden="true">${pad(++chapter)}</span>`;

const orbitDiagram = `
          <div class="diagram reveal" aria-hidden="true">
            <svg viewBox="0 0 600 600">
              <defs><radialGradient id="planet" cx="40%" cy="35%"><stop offset="0" stop-color="#2a6fd6"/><stop offset="1" stop-color="#061230"/></radialGradient></defs>
              <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(238,242,255,0.08)"/>
              <circle cx="300" cy="300" r="210" fill="none" stroke="rgba(238,242,255,0.12)" stroke-dasharray="2 6"/>
              <circle cx="300" cy="300" r="70" fill="url(#planet)"/>
              <circle cx="300" cy="300" r="74" fill="none" stroke="rgba(127,178,255,0.6)"/>
              <g class="spin"><circle cx="300" cy="300" r="140" fill="none" stroke="rgba(127,178,255,0.35)"/><circle cx="440" cy="300" r="6" fill="#eef2ff"/><text x="452" y="296" fill="#9aa5c4" font-family="Manrope" font-size="12" letter-spacing="2">CUBESAT</text></g>
              <g class="spin slow"><circle cx="300" cy="300" r="210" fill="none" stroke="rgba(245,102,0,0.55)"/><circle cx="300" cy="90" r="8" fill="#f56600"/><text x="314" y="86" fill="#f56600" font-family="Manrope" font-size="12" letter-spacing="2">ORBITAL</text></g>
            </svg>
          </div>`;

const space = {
  dir: "designs/b-deep-space",
  css: "space.css",
  themeColor: "#03050C",
  fonts: "https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;600&family=Manrope:wght@400;500;600&display=swap",

  header(file) {
    chapter = 0;
    return `
  <header class="site-header" id="site-header">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="${UP}assets/logo.svg" alt="" width="30" height="30" data-logo-target>Clemson Orbital</a>
      <nav id="site-nav" class="site-nav" aria-label="Main">
        <ul>
${navList(file)}
        </ul>
      </nav>
      <a class="btn btn-secondary header-cta" href="contact.html#message">Get in touch</a>
      ${toggleButton}
    </div>
  </header>
`;
  },

  homeHero() {
    return `
    <section class="hero">
      <div class="sky"></div>
      <svg class="orbit-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path class="path" d="M -100 560 Q 720 120 1540 560" fill="none" stroke="rgba(245,102,0,0.7)" stroke-width="1.2" stroke-dasharray="3 6"/>
        <g class="sat"><rect x="-5" y="-5" width="10" height="10" fill="#eef2ff"/><rect x="-22" y="-2" width="14" height="4" fill="#7fb2ff"/><rect x="8" y="-2" width="14" height="4" fill="#7fb2ff"/></g>
      </svg>
      <div class="earth"></div>
      <div class="hero-content">
        <span class="eyebrow">${HOME.eyebrow}</span>
        <h1>${HOME.h1[0]}<strong>${HOME.h1[1]}</strong></h1>
        <p class="lead">${HOME.lead}</p>
        <div class="actions">
          <a class="btn btn-primary" href="missions.html">See our missions &rarr;</a>
          <a class="btn btn-secondary" href="contact.html">Meet the team</a>
        </div>
      </div>
      <div class="telemetry">
        <div class="wrap">
${HOME.facts.map(([k, v]) => `          <span>${k.replace(":", "")} <b>${v}</b></span>`).join("\n")}
          <span class="scroll-cue"><i></i>Scroll</span>
        </div>
      </div>
    </section>
`;
  },

  pageHero(file, h) {
    const idx = PAGES.findIndex(([f]) => f === file);
    return `
    <section class="page-hero">
      <div class="sky"></div>
      <div class="planet" aria-hidden="true"></div>
      <div class="ring" aria-hidden="true"></div>
      <div class="wrap">
        <span class="chapter-tag">${pad(idx + 1)} / 06<i></i>${h.eyebrow}</span>
        <h1>${h.h1}</h1>
        <p class="lead">${h.lead}</p>
      </div>
    </section>
`;
  },

  head(block) {
    return `        <div class="section-head reveal">
          ${numeral()}
          <div>
            <span class="eyebrow">${block.eyebrow}</span>
            <h2>${block.h2}</h2>${block.p ? `
            <p>${block.p}</p>` : ""}
          </div>
        </div>`;
  },

  cards(block) {
    return `
    <section class="section">
      <div class="wrap">
${this.head(block)}
        <div class="cards cols-${block.cols}${block.pillars ? " pillars" : ""} reveal">
${block.items.map((it, i) => cardHtml(it, i, block)).join("\n")}
        </div>
      </div>
    </section>
`;
  },

  split(block) {
    return `
    <section class="section">
      <div class="wrap">
${this.head(block)}
        <div class="split">
          <div class="split-body reveal">
            ${block.paras.map((p) => `<p>${p}</p>`).join("\n            ")}${block.link ? `
            <a class="text-link" href="${block.link[1]}">${block.link[0]} &rarr;</a>` : ""}
          </div>${block.diagram ? orbitDiagram : ""}
        </div>
      </div>
    </section>
`;
  },

  list(block) {
    return `
    <section class="section">
      <div class="wrap">
${this.head(block)}
        <div class="split">
          <div class="reveal">${listHtml(block)}</div>
          <div class="reveal"><a class="btn btn-primary" href="${block.button[1]}">${block.button[0]} &rarr;</a></div>
        </div>
      </div>
    </section>
`;
  },

  cta(block) {
    return `
    <section class="cta">
      <div class="wrap">
        <div class="cta-box reveal">
          <h2>${block.h2}</h2>
          ${block.paras.map((p) => `<p>${p}</p>`).join("\n          ")}
          <a class="btn btn-primary" href="${block.button[1]}">${block.button[0]} &rarr;</a>
        </div>
      </div>
    </section>
`;
  },

  leaders() {
    return leadersBlock(this.head({ eyebrow: "Leadership", h2: "Leadership", p: "General questions go to everyone through the form below." }));
  },

  form() {
    return `
    <section class="section" id="message">
      <div class="wrap contact-grid">${formIntro}${formMarkup}
      </div>
    </section>
`;
  },

  extraScript: `
  <script>
    (function () {
      var header = document.getElementById("site-header");
      var update = function () { header.classList.toggle("solid", window.scrollY > 40); };
      addEventListener("scroll", update, { passive: true });
      update();
    })();
  </script>`,
};

/* ------------------------------------------------------------------ */

function build(theme) {
  const outDir = path.join(ROOT, theme.dir);
  fs.mkdirSync(outDir, { recursive: true });
  for (const [file] of PAGES) {
    const page = CONTENT[file];
    let html = head(theme, page) + theme.header(file) + `\n  <main id="main">`;
    html += file === "index.html" ? theme.homeHero() : theme.pageHero(file, page.hero);
    for (const block of page.blocks) html += theme[block.type](block);
    html += `  </main>\n` + footer(page, theme.extraScript);
    fs.writeFileSync(path.join(outDir, file), html);
  }
  console.log("built", theme.dir);
}

build(daylight);
build(space);
