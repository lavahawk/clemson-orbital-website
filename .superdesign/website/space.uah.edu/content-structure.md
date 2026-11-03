# Space Hardware Club

## Business Context
- **Type/Industry:** University student organization / STEM education
- **What they do:** Provide hands-on hardware and software engineering experience and research opportunities for UAH students across five program tracks
- **Target audience:** Current and prospective UAH students interested in spacecraft, robotics, and aerospace projects
- **Page goal:** Recruit members and direct traffic to program pages and involvement signup

# Page Layout & Structure

### Hero
Full-width image overlay (campus/team photo, ~50% opacity navy tint) with centered, stacked content. Center-aligned h1 "Welcome to Space Hardware Club" in white, large display type. Subtitle "Hands-on STEM experience from year one to graduation" in white body text below. Circular SHC logo (white stroke, navy fill, ~120px) floats above h1, centered. Primary CTA button "Get Involved" in bright blue (accent color), sits below subtitle. Asymmetry: logo centered top, text stack centered, button centered. Main color: navy (dominant background). Accent color: bright blue (button only in hero). No secondary decorative elements beyond logo.

### Header / Navigation
Fixed horizontal nav, left-aligned SHC logo + text "Space Hardware Club" in white on navy. Right side: horizontal link list (Home, Club Organization, Programs, Committees, Two Month, Partners) in white text. Search textbox labeled "Search..." with dark background, sits far right. No dropdown arrows visible in nav (dropdowns implied by "Club Organization" and "Programs" but not shown in the frame). No secondary CTA in nav. Sticky positioning; stays navy throughout scroll.

### Primary CTA / Input
"Get Involved" button: bright blue background, white text, placed center in hero below subtitle. Links to `/getinvolved.html`. Button action: navigate to involvement signup or details page.

### About Space Hardware Club
- **Purpose:** Explain the club's mission and value proposition to new visitors.
- **Layout:** Two-column, left-right split. Left: YouTube embed (iframe, ~355×240px, 1.00:1 square-ish ratio) with "Video produced by Ian Bush" caption below. Right: h2 "About Space Hardware Club" + paragraph body text. Social icon row (Discord, LinkedIn, YouTube, Email, Facebook—5 icons, navy/dark color) sits below video embed on left.

### Our Programs ×5
- **Purpose:** Showcase five program tracks; each is an entry point to deeper program pages.
- **Layout:** Uniform grid, 3 columns, 5 cells (3-2 wrap). Each cell: white card with lightly rounded corners, navy background section behind. Card interior: program logo (1.00:1 square, ~120px), h3 program name (AutoSat, BalloonSat, Rocketry, Spaceflight, Outreach), short description text (1 sentence), "Learn More →" link in bright blue. Each card is a clickable link to its program page. Grid sits on navy background section.

### Footer
- **Purpose:** Provide secondary navigation, social links, and contact info.
- **Layout:** Dark navy/charcoal background. Left-aligned SHC logo (white). Social icon row (Discord, LinkedIn, YouTube, Email, Facebook—5 icons, white) below logo. Right side: horizontal link list (Contact, Events, Map, Sitemap, Calendar) in white text, small font. Single-line footer, no column stacking.

**Notable patterns:** 
- Hero uses navy + bright blue accent; all other sections maintain navy (nav + programs background + footer).
- Programs grid: uniform 3-column, 5-cell wrap (3 top, 2 bottom). Each card has white surface on navy background.
- Social icons repeat in three locations: hero (below video), header (nav right, if present), footer (left side).
- No image alternation; programs grid is symmetric.
- All cards and buttons use lightly rounded corners (design token standard).
- Search input in nav; no other form inputs on page.