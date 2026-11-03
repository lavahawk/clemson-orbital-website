// Builds the live site (design D, "One motif"): writes the five inner pages at the site root and gives the home page
// the same header and footer. Copy comes from .superdesign/copy.md, set in D's lowercase headings.
// Run from the repo root:  node designs/tools/build-d.js
const fs = require("fs");
const path = require("path");

const DIR = path.resolve(__dirname, "..", "..");  // the site root: D is the live design
const UP = "";
const PAGES = [
  ["index.html", "home"],
  ["about.html", "about"],
  ["missions.html", "missions"],
  ["research.html", "research"],
  ["advocacy.html", "advocacy"],
  ["team.html", "team"],
  ["contact.html", "contact"],
];

/* ---------------- Shared pieces ---------------- */

// The header's logo lockup is the one from the current build: Archivo wordmark, IBM Plex Mono sub-label.
// Bumped whenever motif.css or motif.js changes, so browsers drop their cached copy.
const VERSION = "6";

const BRAND_FONTS =`<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112..125,600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet"> <!-- taste-skill-ignore: header lockup kept from the current build -->`;

function header(file) {
  const links = PAGES.filter(([f]) => f !== "index.html")
    .map(([f, label]) => `      <a href="${f}"${f === file ? ' aria-current="page"' : ""}>${label}</a>`).join("\n");
  return `<header class="top">
    <a class="brand" href="index.html" aria-label="Clemson Orbital home">
      <img src="${UP}assets/logo.svg" alt="" width="34" height="34">
      <span>
        <span class="brand-name">Clemson Orbital</span>
        <span class="brand-sub">Space at Clemson</span>
      </span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">menu</button>
    <nav id="site-nav" aria-label="Main">
${links}
    </nav>
  </header>`;
}

const CREDITS = `<p class="credits">Team, lab and X-PLORE photos are Clemson Orbital's own. Pictures of the wider world, captioned where they appear: footage of <a href="https://commons.wikimedia.org/wiki/File:BurstCube_Deploys_from_International_Space_Station_(SVS14608_-_BurstCube_Deployment_2_720p).webm">BurstCube leaving the ISS</a> by NASA's Scientific Visualization Studio; <a href="https://commons.wikimedia.org/wiki/File:GASPACS_moments_after_deployment_from_the_International_Space_Station.jpg">GASPACS after deployment</a> by NASA astronaut Mark T. Vande Hei; <a href="https://commons.wikimedia.org/wiki/File:NanoRacks_CubeSat_deployer_deploying_CXBN-2_and_IceCube.jpg">CubeSats leaving a NanoRacks deployer</a>, <a href="https://commons.wikimedia.org/wiki/File:ISS-47_Earth%E2%80%99s_limb_during_a_starry_night_pass_above_the_Indian_Ocean.jpg">Earth's limb from ISS-47</a>, <a href="https://commons.wikimedia.org/wiki/File:Rocket_Launches_from_Wallops_Flight_Facility_(8969248575).jpg">a launch from Wallops</a> and <a href="https://www.rawpixel.com/image/441055/free-photo-image-manufacturing-factory-solar-panel">the Juno solar array test</a> by NASA, all public domain; <a href="https://commons.wikimedia.org/wiki/File:Sunrise_on_Hartwell.png">Sunrise on Hartwell</a> by Stelath, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. None of them show Clemson Orbital hardware.</p>`;

const footer = `<footer class="foot">
    <div class="foot-mark"><img src="${UP}assets/logo.svg" alt="" width="520" height="580"><span>clemson<br>orbital</span></div>
    <div class="foot-cols">
      <div><strong>work</strong><ul><li><a href="missions.html">missions</a></li><li><a href="research.html">research</a></li><li><a href="advocacy.html">advocacy</a></li></ul></div>
      <div><strong>team</strong><ul><li><a href="about.html">about</a></li><li><a href="team.html">our team</a></li><li><a href="contact.html">contact</a></li></ul></div>
      <div><strong>programs</strong><ul><li><a href="missions.html">Clemson CubeSat</a></li><li><a href="advocacy.html#xplore">X-PLORE</a></li></ul></div>
      <div><strong>place</strong><ul><li>Clemson, South Carolina</li></ul></div>
      <div><strong>write</strong><ul><li><a href="mailto:cubesat@clemson.edu">cubesat@clemson.edu</a></li></ul></div>
    </div>
    ${CREDITS}
    <div class="foot-base"><span>&copy; 2026 Clemson Orbital</span><a class="btn" href="#main">back to top</a></div>
  </footer>`;

function page({ file, title, description, hero, body, scripts = [] }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#0A0B0F">
  <link rel="canonical" href="https://clemsonorbital.org/${file}">
  <link rel="icon" href="${UP}assets/logo.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://api.fontshare.com">
  <link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400,500,700&display=swap" rel="stylesheet">
  ${BRAND_FONTS}
  <link rel="stylesheet" href="css/motif.css?v=${VERSION}">
  <script>document.documentElement.classList.add("js");</script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  ${header(file)}

  <main id="main">
    <section class="page-hero">
      <div class="hero-copy">
        <h1 class="rise">${hero.h1}</h1>
        <p class="rise" style="--d:90ms">${hero.lead}</p>
      </div>
    </section>
${body}
  </main>

  ${footer}

${[...scripts, `js/motif.js?v=${VERSION}`].map((s) => `  <script src="${s}"></script>`).join("\n")}
</body>
</html>
`;
}

const folder = (tab, cat, media, text, link) => `
      <article class="folder">
        <div class="folder-strip"><span class="tab rise">${tab}</span><span class="folder-cat">${cat}</span></div>
        <div class="folder-body">
          ${media.src ? `<figure class="folder-media rise"><img src="${UP}${media.src}" alt="${media.alt}" width="${media.w || 1200}" height="${media.h || 1600}" loading="lazy" style="object-position:${media.at || "50% 50%"}">${media.cap ? `<figcaption>${media.cap}</figcaption>` : ""}</figure>` : `<div class="folder-media ${media} rise" aria-hidden="true">${media === "motif-units" ? "<i></i><i></i><i class=\"on\"></i>" : media === "motif-place" || media === "motif-rest" ? "<i></i>" : ""}</div>`}
          <div class="folder-text rise" style="--d:90ms">
            <p>${text}</p>${link ? `
            <a class="more" href="${link[1]}">${link[0]}</a>` : ""}
          </div>
        </div>
      </article>`;

const folders = (h2, items) => `
    <section class="work" aria-label="${h2}">
      <div class="wrap"><h2 class="rise">${h2}</h2></div>${items.join("")}
    </section>`;

const split = (h2, paras, extra = "") => `
    <section class="split">
      <h2 class="rise">${h2}</h2>
      <div class="split-text rise" style="--d:90ms">
        ${paras.map((p) => `<p>${p}</p>`).join("\n        ")}${extra}
      </div>
    </section>`;

const dots = (items) => `
        <ul class="dots">
          ${items.map((it, i) => `<li class="rise" style="--d:${120 + i * 80}ms">${it.title ? `<strong>${it.title}</strong>` : ""}${it.body}</li>`).join("\n          ")}
        </ul>`;

const closeTile = (h2, p, button) => `
    <section class="close-tile rise">
      <div>
        <h2>${h2}</h2>
        <p>${p}</p>
      </div>
      <a class="btn on-accent" href="${button[1]}">${button[0]}</a>
    </section>`;

const MEDIA = ["motif-units", "motif-place", "motif-ring", "motif-rest"];
// The team's own ground station work, photographed in the lab.
const GS_ANTENNA = { src: "assets/photos/groundstation-antenna.jpg", at: "50% 55%", alt: "A crossed Yagi antenna for satellite passes laid out on a lab workbench, its aluminium elements and coax cables in the foreground." };
const TEAM_TALK = { src: "assets/photos/team-presenting.jpg", w: 1280, h: 960, at: "50% 40%", alt: "Five Clemson Orbital members presenting the team's current projects to a lecture hall." };
const XPLORE_PHOTO = { src: "assets/photos/xplore-greenville-tabling.jpg", w: 1800, h: 1350, at: "50% 45%", alt: "Clemson Orbital members talking with a family at the X-PLORE table at a street event in Greenville." };
// Found pictures of the wider world (credited in the footer). Each carries a caption so it is never read as our own hardware.
const HARTWELL = { src: "assets/sunrise-on-hartwell.jpg", w: 1920, h: 1273, at: "50% 60%", alt: "Sunrise over Lake Hartwell, the lake beside Clemson's campus.", cap: "Lake Hartwell, Clemson. Photo: Stelath, CC BY 4.0" };
const CLEANROOM = { src: "assets/in-a-clean-room-environment-at-astrotech.webp", w: 1200, h: 800, alt: "Technicians in clean-room suits testing a spacecraft's solar array panels.", cap: "Juno solar array test, Astrotech. NASA photo" };
const WALLOPS = { src: "assets/rocket-launches-from-wallops-flight-facility-8969248575.jpg", w: 1600, h: 2400, at: "50% 35%", alt: "A sounding rocket lifting off from NASA's Wallops Flight Facility on the Virginia coast.", cap: "Launch from Wallops, Virginia. NASA photo" };
const EARTH_LIMB = { src: "assets/iss-47-earth-s-limb-during-a.jpg", w: 1920, h: 1278, alt: "Earth's glowing edge and the stars, seen from the International Space Station at night.", cap: "Earth's limb from the ISS. NASA photo" };
const DEPLOYER = { src: "assets/nanoracks-cubesat-deployer-deploying-cxbn-2-and.jpg", w: 1024, h: 682, alt: "Two CubeSats leaving a deployer on the International Space Station, with Earth below.", cap: "CubeSats leaving the ISS. NASA photo" };
const CUBESAT_ORBIT = { src: "assets/gaspacs-moments-after-deployment-from-the-international.jpg", w: 1920, h: 1280, alt: "A small CubeSat drifting away from the International Space Station above Earth.", cap: "GASPACS, Utah State's CubeSat. NASA photo" };
const GS_BENCH = { src: "assets/photos/groundstation-bench.jpg", at: "55% 50%", alt: "A member taking notes beside a ground station test setup: an SDRplay RSPduo receiver, a Raspberry Pi with a small screen, and an antenna manual." };

// X-PLORE, the semester-long program for middle and high school students (Advocacy page).
const XPLORE_STEPS = [
  ["choose the mission", "Each team chooses what its spacecraft will carry, then runs trade studies to back up every choice."],
  ["defend it every month", "Teams meet Clemson CubeSat members once a month for reviews modeled on NASA's Preliminary Design Reviews."],
  ["write it up", "They write a research proposal for an informed scientific audience, and can build a prototype if they want to."],
  ["take it home", "Outreach events carry the project into their own schools and neighborhoods."],
  ["present at the summit", "The semester closes at the Clemson X-PLORE Summit, where teams present research posters to PhD researchers, NASA scientists, and industry engineers."],
];
const xplore = `
    <section class="program" id="xplore" aria-labelledby="xplore-h">
      <div class="program-intro">
        <h2 id="xplore-h" class="rise"><span class="keep-case">X-PLORE</span>: a semester as a spacecraft team</h2>
        <p class="rise" style="--d:90ms">X-PLORE (Exploration Projects for Learning, Outreach, Research, and Engineering) gives a team of middle or high school students the job of a spacecraft engineering division for a full semester. It runs the way a real mission team works: choices get justified, designs get reviewed, and the work ends in front of people who do this for a living.</p>
        <figure class="program-photo rise" style="--d:160ms">
          <img src="${UP}assets/photos/xplore-greenville-tabling.jpg" alt="Three Clemson Orbital members in team polos talking with a family beside a Clemson CubeSat banner and a model rocket at a street event in Greenville." width="1800" height="1350" loading="lazy">
          <figcaption>Our team tabling for X-PLORE in Greenville.</figcaption>
        </figure>
      </div>
      <div class="program-steps">
        <ol class="dots steps">
          ${XPLORE_STEPS.map(([t, b], i) => `<li class="rise" style="--d:${120 + i * 80}ms"><strong>${t}</strong>${b}</li>`).join("\n          ")}
        </ol>
        <a class="btn rise" href="contact.html#message">bring <span class="keep-case">X-PLORE</span> to your school</a>
      </div>
    </section>`;

const STAGES = [
  ["define", "Set the goal, the requirements, and what success looks like in plain terms."],
  ["design", "Size the spacecraft, pick the subsystems, and check every interface before anyone cuts metal."],
  ["build", "Fabricate, wire, and program, keeping drawings and the parts list current."],
  ["test", "Vibration, thermal vacuum, and functional checks. Better to find failures on the bench."],
  ["launch", "Prepare for integration with a launch provider and support the spacecraft through deployment."],
  ["operate", "Command it, pull down the data, and get the results to the people who need them."],
];

const stages = `
    <section class="stages wrap" aria-labelledby="stages-h">
      <div class="stages-intro">
        <h2 id="stages-h" class="rise">six phases, each ends in a review</h2>
        <p class="rise" style="--d:90ms">We don't start a phase until the last one has a written record. Members and outside advisors can sit in on any review.</p>
      </div>
      <div class="accordion" role="list">
        ${STAGES.map(([n, b], i) => `<button class="stage" type="button" aria-expanded="${i === 0}" role="listitem"><span class="stage-name">${n}</span><span class="stage-open"><span class="text"><strong class="stage-title">${n}</strong><p>${b}</p></span></span></button>`).join("\n        ")}
      </div>
    </section>`;

const coupon = `
    <section class="coupon-wrap" id="message" aria-labelledby="contact-h">
      <div class="coupon rise">
        <div class="coupon-left">
          <h2 id="contact-h">send us a message</h2>
          <p>Students asking how to join, faculty who'd like to advise a team, companies thinking about sponsorship, schools that want a visit: it all lands with the same team at <a href="mailto:cubesat@clemson.edu">cubesat@clemson.edu</a>. We usually reply within a week during the semester.</p>
        </div>
        <form id="contact-form" novalidate>
          <label class="sr" for="name">Name</label><input id="name" name="name" type="text" autocomplete="name" placeholder="your name" required>
          <label class="sr" for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" placeholder="your email" required>
          <label class="sr" for="affiliation">Affiliation (optional)</label><input id="affiliation" name="affiliation" type="text" placeholder="affiliation (optional)">
          <label class="sr" for="topic">What's this about?</label>
          <select id="topic" name="topic" required>
            <option value="">what's this about?</option>
            <option>Joining the team</option>
            <option>Sponsorship or partnership</option>
            <option>Outreach or a school visit</option>
            <option>The X-PLORE program</option>
            <option>Media or general question</option>
          </select>
          <label class="sr" for="message-body">Message</label><textarea id="message-body" name="message" placeholder="a few sentences is plenty" required></textarea>
          <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          <button class="btn submit" type="submit">send message</button>
          <p class="form-status" id="form-status" role="status"></p>
        </form>
      </div>
    </section>`;

/* ---------------- Pages ---------------- */

const write = (file, html) => fs.writeFileSync(path.join(DIR, file), html);

write("about.html", page({
  file: "about.html",
  title: "About | Clemson Orbital",
  description: "Clemson Orbital is a student-led initiative bringing aerospace to students at Clemson through research opportunities, new projects, and real-world experience across all disciplines.",
  hero: { h1: "the goal is space at clemson.", lead: "We're a student-led initiative bringing aerospace to Clemson: we create research opportunities, help new projects get started, and give students in every discipline real-world experience." },
  body: [
    split("why “orbital”", [
      "Clemson Orbital is the umbrella. Clemson CubeSat is one program under it, and it gives Clemson students the chance to apply themselves to the design and build of research satellites.",
      "A space program needs more than one satellite. It needs research worth flying, a ground station to talk to the spacecraft, younger students who'll join in a few years, and people in the state who care whether it works. We picked a name that covers all of that.",
      "We haven't flown anything yet. Our first spacecraft are still in design, so this is when the habits get set: open reviews, honest testing, and documents the next class can pick up.",
    ]),
    folders("how we work", [
      folder("build it to fly", "testing", GS_BENCH, "A design isn't done until it survives vibration, thermal cycling, and the people who have to operate it. We plan to test early and write down what broke."),
      folder("write it down", "reviews", TEAM_TALK, "Reviews are open, documents stay current, and every lesson gets handed to the next team. If only one person understands a subsystem, it isn't finished."),
      folder("keep the south in the room", "the region", HARTWELL, "Decisions about aerospace get made in a handful of places. We want students and companies from this region in those conversations, and we want to show the work can happen here."),
    ]),
    split("you don't need orbital mechanics yet", [
      "Orbital is open to every major. Engineers design the hardware, but a space program also needs people who write, design, manage budgets, run events, and talk to the public. Plenty of members joined without any space experience and learned it next to someone a semester ahead of them.",
      "We also work with faculty, grad students, local companies, and community groups. If you can help with a design review, a ground station, a school visit, or a funding conversation, we'd like to hear from you.",
    ], `
        <a class="btn" href="team.html">meet the team</a>`),
    closeTile("want to help build space at clemson?", "Join a team, bring X-PLORE to your classroom, or sponsor the work. Write to us and we'll tell you honestly where you'd fit.", ["get in touch", "contact.html#message"]),
  ].join("\n"),
}));

write("missions.html", page({
  file: "missions.html",
  title: "Missions | Clemson Orbital",
  description: "How Clemson Orbital plans to run a mission, from the first requirements review to operations, and the programs we're working toward. Our first spacecraft are in design.",
  hero: { h1: "our first missions are on the whiteboard.", lead: "A mission is the whole life of a spacecraft: the question it answers, the hardware that answers it, and the operations after launch. We haven't flown yet, so we're setting up how we'll work first." },
  body: [
    stages,
    folders("where we're headed", [
      folder("clemson cubesat", "in design", CLEANROOM, "Research satellites designed and built by Clemson students. The first one is still on the drawing board; we'll post details as it firms up."),
      folder("larger platform", "future · concept only", WALLOPS, "A bigger spacecraft that could carry several experiments and run for longer. For now it's an idea and a list of requirements, not a launch date."),
      folder("ground stations", "in progress · on campus", GS_BENCH, "We're putting together a receiving station in the lab now: a software radio, a Raspberry Pi, and antennas for satellite passes. A station on campus first, then partner sites around the state so we can hear our spacecraft on more passes."),
    ]),
    closeTile("want to work on a mission?", "Most members join without any space experience. Pick a subsystem and learn it next to someone a semester ahead of you.", ["join the team", "contact.html#message"]),
  ].join("\n"),
}));

write("research.html", page({
  file: "research.html",
  title: "Research | Clemson Orbital",
  description: "The research questions Clemson Orbital students are working on: the space environment, small satellite systems, sensing and imaging, and communications.",
  hero: { h1: "a lab that has to survive a rocket launch.", lead: "Orbit offers conditions that are hard to fake on the ground. Our students pick questions worth sending there and design the hardware to answer them." },
  body: [
    split("the question comes first", [
      "Every Clemson CubeSat starts with a research question. Students write it down, work out what the spacecraft has to measure, and then do the engineering around it: mechanical fit, power budget, data handling, and the safety reviews launch providers require.",
      "We invite faculty to review the science, and members see an experiment through from the first question to the final design review.",
    ]),
    folders("where we focus", [
      folder("space environment", "measured in place", EARTH_LIMB, "Radiation, thermal swings, and drag, measured in place to check the models engineers rely on."),
      folder("small satellite systems", "on very little hardware", DEPLOYER, "Attitude control, power, and software that has to run on very little hardware."),
      folder("sensing and imaging", "earth and near space", CUBESAT_ORBIT, "Instruments that look at Earth or near space, with an eye on data regional partners can use."),
      folder("communications", "a few minutes overhead", GS_ANTENNA, "Link budgets and ground stations for a spacecraft that's only overhead for a few minutes at a time. Members are already building and testing the antennas in our lab."),
    ]),
    split("work on it with us", [], dots([
      { title: "faculty and grad researchers", body: "Advise a student team or sit in on a design review." },
      { title: "undergraduates", body: "Join a project already underway in one of these areas." },
      { title: "industry and agencies", body: "Mentor students, donate components, or lend test equipment." },
    ]) + `
        <a class="btn" href="contact.html#message">start a conversation</a>`),
  ].join("\n"),
}));

write("advocacy.html", page({
  file: "advocacy.html",
  title: "Advocacy | Clemson Orbital",
  description: "Clemson Orbital connects South Carolina students, schools, companies, and leaders, and makes the case for space work in the Southeast.",
  hero: { h1: "space work shouldn't require leaving the southeast.", lead: "South Carolina has universities, manufacturers, and students who could build the next generation of space hardware. We connect them and make the case for investing here." },
  body: [
    split("why this region, and why now", [
      "The space industry is spreading beyond its old hubs. Companies want engineers who can work on a real system from day one, and students need to see that those jobs can exist close to home.",
      "So we want our advocacy to be practical: students meeting local employers, employers sitting in on our reviews, and our results reaching the people who decide on research funding and workforce programs.",
    ]),
    folders("who we work with", [
      folder("schools", "visits and demos", TEAM_TALK, "Visits and hands-on demos for kids who've never seen a satellite up close."),
      folder("communities", "talks and open events", HARTWELL, "Public talks and open events in Clemson and around the state."),
      folder("industry", "sponsors and mentors", CLEANROOM, "Sponsorship, mentorship, and technical review from regional companies, plus an early look at the students they'll want to hire."),
      folder("policy", "state and local leaders", WALLOPS, "Conversations with state and local leaders about research funding, workforce programs, and what space work needs here."),
    ]),
    xplore,
    split("help us make the case", [], dots([
      { body: "Host a visit at your school, library, or community group." },
      { body: "Mentor or sponsor a student team or a specific outreach event." },
      { body: "Introduce us to someone who should be part of the conversation." },
    ]) + `
        <a class="btn" href="contact.html#message">get in touch</a>`),
  ].join("\n"),
}));

write("team.html", page({
  file: "team.html",
  title: "Team | Clemson Orbital",
  description: "Meet the students leading Clemson Orbital, the programs they run, and how to join from any major.",
  hero: { h1: "the students building it.", lead: "Clemson Orbital is run by students, for students. Here's who leads it, what each program does, and how to get involved from any major." },
  body: `
    <section class="leaders-wrap" aria-labelledby="leaders-h">
      <h2 id="leaders-h" class="rise">leadership</h2>
      <p class="rise">The officers who keep the programs running. General questions go to all of us through the <a href="contact.html">contact form</a>.</p>
      <div class="leaders rise" id="leaders" data-headshot-dir="${UP}assets/headshots/" aria-live="polite">
        <noscript><p>Leadership profiles need JavaScript to load. Email <a href="mailto:cubesat@clemson.edu">cubesat@clemson.edu</a> to reach the team.</p></noscript>
      </div>
    </section>
${folders("our programs", [
      folder("clemson cubesat", "design and build", TEAM_TALK, "Students apply themselves to the design and build of research satellites, from the first requirements review onward.", ["how a mission works", "missions.html"]),
      folder("ground station", "in the lab now", GS_BENCH, "A receiving station on campus: software radio, antennas, and the code to track a satellite across the sky.", ["our research", "research.html"]),
      folder("x-plore", "outreach", XPLORE_PHOTO, "Middle and high school students spend a semester working as a spacecraft engineering team, with our members as reviewers.", ["about x-plore", "advocacy.html#xplore"]),
    ])}
${split("every discipline has a seat", [
      "You don't need to be an aerospace engineer, or any kind of engineer. Members work on hardware and software, but also on writing, design, budgets, events, and outreach.",
      "New members join a project already underway and learn it next to someone a semester ahead. If you have an idea for a new project, we'll help you find the people to start it.",
    ], `
        <a class="btn" href="contact.html#message">join the team</a>`)}`,
  scripts: [`${UP}data/leadership.js`, `${UP}js/leadership.js`],
}));

write("contact.html", page({
  file: "contact.html",
  title: "Contact | Clemson Orbital",
  description: "Send a message to the Clemson Orbital team at cubesat@clemson.edu about joining, sponsorship, X-PLORE, or outreach.",
  hero: { h1: "write to clemson orbital.", lead: "Joining, sponsorship, X-PLORE or a school visit: one inbox reaches the whole team. Looking for a specific person? Our leadership is on the team page." },
  body: `${coupon}`,
  scripts: [`${UP}js/contact.js`],
}));

/* ---------------- Home: same header and footer, links to the new pages ---------------- */
const homePath = path.join(DIR, "index.html");
let home = fs.readFileSync(homePath, "utf8").replace(/\r\n/g, "\n");
home = home.replace(/<header class="top">[\s\S]*?<\/header>/, header("index.html"));
if (!home.includes("family=Archivo")) home = home.replace('  <link rel="stylesheet" href="css/motif.css">', "  " + BRAND_FONTS + '\n  <link rel="stylesheet" href="css/motif.css">');
home = home.replace(/<footer class="foot">[\s\S]*?<\/footer>/, footer);
home = home
  .replace('href="../a-daylight/about.html">read our story', 'href="about.html">read our story')
  .replace('<a class="more" href="#stages">how a mission works</a>', '<a class="more" href="missions.html">how a mission works</a>')
  .replace('<a class="more" href="#fit">check whether yours fits</a>', '<a class="more" href="research.html">research with us</a>')
  .replace('<a class="more" href="#contact">ask us to visit</a>', '<a class="more" href="advocacy.html">our outreach</a>')
  // The team's own photo in the about panel, in place of the NASA picture.
  .replace(/<img src="\.\.\/\.\.\/assets\/gaspacs-[^"]*"[^>]*>/, '<img src="../../assets/photos/team-presenting.jpg" alt="Five Clemson Orbital members presenting the team\'s current projects to a lecture hall." width="1280" height="960" loading="lazy">')
  // X-PLORE gets a line in the advocacy folder, and a topic in the contact form.
  .replace("workforce programs in South Carolina.</p>\n            <a class=\"more\" href=\"advocacy.html\">our outreach</a>",
    "workforce programs in South Carolina. Through X-PLORE, middle and high school students spend a semester working as a spacecraft engineering team.</p>\n            <a class=\"more\" href=\"advocacy.html#xplore\">about X-PLORE</a>")
  .replace('<div class="folder-media motif-units rise" aria-hidden="true"><i></i><i></i><i class="on"></i></div>', '<figure class="folder-media rise"><img src="assets/photos/groundstation-bench.jpg" alt="' + GS_BENCH.alt + '" width="1200" height="1600" loading="lazy" style="object-position:55% 50%"></figure>')
  .replace('<div class="folder-media motif-place rise" aria-hidden="true"><i></i></div>', '<figure class="folder-media rise"><img src="assets/photos/xplore-greenville-tabling.jpg" alt="' + XPLORE_PHOTO.alt + '" width="1800" height="1350" loading="lazy" style="object-position:50% 45%"></figure>')
  .replace("            <option>Outreach or a school visit</option>\n            <option>Media", "            <option>Outreach or a school visit</option>\n            <option>The X-PLORE program</option>\n            <option>Media");
fs.writeFileSync(homePath, home);

console.log("built design D:", PAGES.map(([f]) => f).join(", "));
