# Clemson Orbital design system

Mode: inspired by cometsatlab.com (flight-manual editorial system) and space.uah.edu (institutional clarity, program card grid), adapted to Clemson's own colors. MarSat UVA could not be extracted.

## Product context

- Organization: Clemson Orbital, a student-led aerospace organization at Clemson University that grew out of Clemson CubeSat.
- Jobs: fly its own missions to orbit, help researchers get experiments into space, advocate for aerospace in South Carolina and the Southeast.
- Audiences: prospective student members, Clemson faculty and grad researchers with payload ideas, regional companies and sponsors, K-12 schools and community groups, state and local leaders.
- Pages (static multi-page site, sticky top nav): Home, About, Missions, Research, Advocacy, Contact (leadership grid with headshots + contact form to cubesat@clemson.edu).
- Primary actions: "See our missions", "Get in touch", "Propose a payload".
- Domain: clemsonorbital.org
- Copy source: `.superdesign/copy.md`. Use it verbatim; do not invent missions, dates, statistics, or people.

## Visual direction

A mission dossier with Clemson colors. Near-black page, oversized tight display type, small monospace instrument labels, hairline rules, sharp corners. Clemson orange is the only "act here" color. Regalia purple appears as a rare inverted panel, never as a background wash. One warm paper tone gives occasional light cards. No photography yet; the hero carries a line-drawn orbital diagram with an orange orbit trace and a sparse dotted starfield.

## Color tokens

| Token | Value | Use |
|---|---|---|
| --ink | #07080B | page background (dominant, about 70% of pixels) |
| --ink-2 | #0E1016 | alternate section band |
| --panel | #2A1A45 | inverted panel (Regalia purple, darkened); rare |
| --panel-line | #3D2A5E | hairlines on purple panels |
| --paper | #EEE9E1 | light contrast cards; text on paper is --ink |
| --text | #F4F2EE | primary text on dark |
| --muted | #9A9AA3 | secondary text, captions |
| --line | #2A2C33 | hairline rules on dark |
| --orange | #F56600 | Clemson orange: primary buttons, active nav, orbit strokes, card top rules, display headline fragments |
| --orange-hover | #FF7A1A | hover on orange |
| --purple | #522D80 | Clemson Regalia: small tags or dots only |

Orange never fills a panel larger than a button. No gradients except the faint radial glow behind the hero diagram. No other hues.

## Typography

- Display: "Archivo" (Google Fonts), weight 700-800, width 112 to 125 (expanded) when supported; letter-spacing -0.035em; line-height 0.95. Hero h1 clamp(3rem, 8.5vw, 8.5rem).
- Headings: Archivo 600, letter-spacing -0.02em. h2 clamp(2rem, 4.2vw, 3.5rem). h3 1.35rem.
- Body: "Inter" 400/500, 1.0625rem, line-height 1.6, measure max 62ch.
- Labels: "IBM Plex Mono" 500, 0.75rem, uppercase, letter-spacing 0.08em. Used for eyebrows, counters (01 / 06), status chips, coordinates (34.68° N, 82.84° W for Clemson, SC), captions. Never for body or headlines.

## Shape, spacing, depth

- Radius: 0 on cards, panels, inputs; 2px on buttons. No pills.
- Section padding: clamp(80px, 11vw, 144px) vertical. Content max width 1240px; gutter 20px (16px under 600px).
- Grids: 12-column; cards in equal rows with 1px hairline gaps (grid gap 1px over a --line background) so cards read as a ruled sheet.
- Depth: flat color layering only (ink, ink-2, panel, paper). No drop shadows, no blur, no glass.
- Signature: a 2px orange rule on top of the active or featured card; numbered mono counters on every card.

## Components

- Navbar: full-bleed, 72px, sticky, ink background with bottom hairline. Left: logo (exact supplied Brand Asset) plus "Clemson Orbital" wordmark in Archivo 600 and a mono sub-label "Est. from Clemson CubeSat". Center/right: links in Inter 500, active link orange with a 2px underline. Far right: orange "Get in touch" button. Under 900px: square hamburger button, full-screen ink menu with large Archivo links numbered 01-06.
- Buttons: primary = orange fill, ink text, 2px radius, 52px tall, mono-free label in Inter 600, trailing arrow-right icon. Secondary = transparent, 1px --text border at 40% opacity, text --text.
- Card (dark): ink-2 fill, 32px padding, mono counter top-left, Lucide line icon 24px in orange, heading, muted body, "arrow-up-right" link at bottom.
- Card (paper): paper fill, ink text, same anatomy.
- Panel (purple): used once per page at most, for a callout or CTA.
- Status strip: horizontal row of mono labels separated by hairlines (location, heritage, next mission status).
- Lifecycle (missions): six numbered steps in a ruled grid, orange counter, current phase marked with orange top rule.
- Leader card: 4:5 portrait photo area (grayscale headshot, color on hover), initials fallback in Archivo on ink-2, name in Archivo, role as orange mono label, one-line area in muted text.
- Form: 0-radius inputs on ink-2 with 1px --line border, focus border orange, mono field labels.
- Footer: hairline top rule, giant "Clemson Orbital" wordmark in Archivo spanning the width at 12% opacity, then four columns of links with mono group headers, email, coordinates.
- Icons: Lucide line set via better-icons, 1.5-2px stroke, currentColor.

## Motion

- Hovers: color and opacity 0.2s ease.
- Entrance: headline rise and fade 0.75s cubic-bezier(0.16, 1, 0.3, 1), staggered 60ms; orbit path stroke-dashoffset trace once on load. Respect prefers-reduced-motion (no animation).

## Guardrails

- Never round cards or inputs; never use pill buttons.
- Keep orange rationed to actions, active states, rules, and orbit strokes.
- Keep the page dark-dominant; paper and purple are accents.
- No stock-photo placeholders, no emoji, no gradient blobs, no glassmorphism.
- Copy comes from `.superdesign/copy.md`.
