# Layouts

Every page repeats the same header (logo + Clemson Orbital wordmark + nav: Home, About, Missions, Research, Advocacy, Contact; hamburger under 860px) and footer. Source: lines of index.html below.

### Header + footer (index.html, full file)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Clemson Orbital | Aerospace from Clemson to orbit</title>
  <meta name="description" content="Clemson Orbital is a student-led aerospace organization. We build and fly missions to space, support research in orbit, and advocate for aerospace in South Carolina and the Southeast.">
  <link rel="canonical" href="https://clemsonorbital.org/">
  <link rel="icon" href="assets/logo.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="assets/logo.svg" alt="" width="32" height="32">Clemson Orbital</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <nav id="site-nav" class="site-nav" aria-label="Main">
        <ul>
          <li><a href="index.html" aria-current="page">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="missions.html">Missions</a></li>
          <li><a href="research.html">Research</a></li>
          <li><a href="advocacy.html">Advocacy</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero">
      <svg class="orbit-art" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        <g fill="none" stroke="#8fb8ff" stroke-width="1.2">
          <ellipse cx="300" cy="300" rx="280" ry="110" transform="rotate(-24 300 300)" opacity="0.5"/>
          <ellipse cx="300" cy="300" rx="220" ry="200" transform="rotate(12 300 300)" opacity="0.25"/>
          <ellipse cx="300" cy="300" rx="160" ry="60" transform="rotate(-50 300 300)" opacity="0.35" stroke-dasharray="4 6"/>
        </g>
        <circle cx="300" cy="300" r="64" fill="#f56600" opacity="0.9"/>
        <circle cx="478" cy="172" r="9" fill="#e8ecf3"/>
      </svg>
      <div class="wrap">
        <span class="eyebrow">Clemson Orbital</span>
        <h1>We build spacecraft, run research in orbit, and make the case for aerospace in the South.</h1>
        <p class="lead">Clemson Orbital grew out of Clemson CubeSat. We are a student-led organization that designs and flies missions to space, opens those missions to researchers, and works to bring aerospace opportunity to South Carolina and the Southeast.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="missions.html">See our missions</a>
          <a class="btn btn-ghost" href="contact.html">Meet the team</a>
        </div>
      </div>
    </section>

    <section class="tight">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">What we do</span>
          <h2>Three things, done in full.</h2>
          <p>We would rather fly fewer missions well than many missions badly. Every project we take on has to deliver hardware, data, or a clear reason someone in the state is better off for it.</p>
        </div>
        <div class="grid">
          <article class="card">
            <span class="num">01</span>
            <h3>Missions</h3>
            <p>From the first sketch to a working spacecraft in orbit. We design, build, test, launch, and operate our own satellites with students from across Clemson.</p>
            <a class="card-link" href="missions.html">How a mission works &rarr;</a>
          </article>
          <article class="card">
            <span class="num">02</span>
            <h3>Research</h3>
            <p>A flight platform is only useful if people can use it. We help faculty and students turn their experiments into payloads that fly, and bring the data home.</p>
            <a class="card-link" href="research.html">Research areas &rarr;</a>
          </article>
          <article class="card">
            <span class="num">03</span>
            <h3>Advocacy</h3>
            <p>Aerospace work should not require a move out of the state. We run outreach for schools and communities and speak with industry and policymakers about the Southeast's role.</p>
            <a class="card-link" href="advocacy.html">Our outreach &rarr;</a>
          </article>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap split">
        <div>
          <span class="eyebrow">Where we came from</span>
          <h2>A CubeSat team that outgrew its name.</h2>
        </div>
        <div class="stack">
          <p>Clemson CubeSat showed what a small student team can do with a satellite the size of a shoebox. The work was real: flight hardware, ground operations, and people who learned to own a system from start to finish.</p>
          <p>Clemson Orbital keeps that spirit and widens the lens. Our goals now include larger missions, research that needs a platform above the atmosphere, and a regional aerospace community that students can see, join, and build a career in.</p>
          <p><a href="about.html">Read our story &rarr;</a></p>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="contact-card cta-band">
          <div class="cta-text">
            <h2>Want to fly something with us?</h2>
            <p class="lead">Students, faculty, companies, and community groups can all find a way in. Tell us what you are working on.</p>
          </div>
          <a class="btn btn-primary" href="contact.html">Get in touch</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <strong style="color:var(--text);font-family:var(--font-display);">Clemson Orbital</strong><br>
          Clemson, South Carolina<br>
          <a href="mailto:cubesat@clemson.edu">cubesat@clemson.edu</a>
        </div>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="missions.html">Missions</a></li>
          <li><a href="research.html">Research</a></li>
          <li><a href="advocacy.html">Advocacy</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <p class="footer-note">&copy; 2026 Clemson Orbital. Part of the Clemson CubeSat community.</p>
    </div>
  </footer>

  <script src="js/site.js"></script>
</body>
</html>
```

### `js/site.js`

```js
/* Shared behavior: mobile navigation and the header state on scroll. */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var header = document.querySelector(".site-header");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu with Escape, and when a link is chosen on a phone.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (header) {
    var onScroll = function () {
      header.style.borderBottomColor = window.scrollY > 8 ? "rgba(232,236,243,0.18)" : "";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
```

### `assets/logo.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Clemson Orbital logo">
  <ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(-24 32 32)" fill="none" stroke="#8fb8ff" stroke-width="2.5"/>
  <circle cx="32" cy="32" r="10" fill="#f56600"/>
  <circle cx="51" cy="19.5" r="3.6" fill="#e8ecf3"/>
</svg>
```
