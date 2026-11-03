# Comet Satellite Laboratory

## Business Context
- **Type/Industry:** Student-led aerospace engineering club / CubeSat development
- **What they do:** Design, build, and launch student spacecraft; operate workshops and high-altitude balloon missions
- **Target audience:** UT Dallas students (all majors/experience levels); mission supporters; prospective members
- **Page goal:** Convert curiosity into participation (workshops, Discord, or sponsorship inquiry)

# Page Layout & Structure

### Hero
Left-aligned layout: orange H1 "Comets building comets." (display type, tight letter-spacing, near-black background) + 2 stacked body paragraphs in white (club identity + mission statement). Right side: 1.38:1 CubeSat hardware photograph bleeding off right edge. Below text: orange downward chevron link ("Scroll to next section"). No decorative elements beyond the photograph; asymmetric L-text / R-image arrangement emphasizes hardware-first narrative.

### Header / Navigation
Horizontal nav (absolute position, sticky-or-not not specified, assume sticky). Logo left. 6 links: Mission, Catalog, Software, Avionics, Ground, API Docs (all white text). Search icon + "Laboratory" dropdown (white) top right. No primary CTA in nav.

### Capabilities Section
**Purpose:** Introduce 4 core spacecraft engineering disciplines via tabbed interface.  
**Layout:** H2 "Capabilities" (white) + tablist (4 tabs: "CubeSat Design & Integration" [selected], "Flight Software & Autonomy", "Power & Avionics", "Ground & Communications"). Active tab expands below: dark green background card (1.38:1 aspect). Inside: left = "01 / 04" + H3 heading + 1 body paragraph (white). Right = diagram image (1.38:1, CubeSat mission from integration→orbit). Tab interaction updates card in place.

### Learn. Build. Fly. — Section Header & Project Cards ×3
**Purpose:** Showcase 3 entry pathways (Workshops, Balloon Team, Orbital Team).  
**Layout:** Centered H2 "Learn. Build. Fly." (white) + subheading "From your first circuit to the edge of space." (gray). Below: 3-column uniform grid of cards (each 1:1 thumbnail illustrations + white background section headers). Each card = H3 heading + 1.00:1 illustration + definition list (4 dt/dd pairs: Focus/Learn by making, Explore/Electronics code design, Approach/Hands-on together, Start here/All experience levels). Footer of each: "Build with us" link (orange, anchors to #join). No image alternation; cards stack uniformly.

### Our Lab & Your Next Mission — Context + Dual CTAs
**Purpose:** Narrative pitch + dual pathways (join / support).  
**Layout:** H2 (white) + 2 body paragraphs (white). Below: 2-row layout, each row = 1 subsection (H3 + expandable button area). Row 1 = "Build with us" (button + 2 body paragraphs + Discord link in orange). Row 2 = "Support the mission" (button + paragraph + link to founder email). Buttons use accent color (orange); layout alternates heading left / content right per row (visual rhythm).

### Laboratory, Get Involved, Explore, Contact Sections
**Purpose:** Footer-region navigation & utilities.  
**Layout:** Each is a simple H2 heading + vertical list of links (white text). Stub treatment: 4 minimal nav clusters before true footer.

### Footer
Logo (left) + 3-column link grid (Capabilities, Avionics, Communications | Missions, CubeSat, Software, The Laboratory | Join CSL, Student workshops, Support CSL, Communications). Bottom bar: copyright + contact email (gray text). Social links (Instagram, LinkedIn).

**Notable patterns:**
- Accent color (orange) used on: H1, chevron link, tab underlines, "Build with us" buttons, project card links, email links.
- Background alternation: near-black (hero, nav, Learn/Build/Fly section bg) → dark green (Capabilities card) → near-black (lower sections) → gray footer area.
- Grid types: Capabilities = tabbed single-card (not a grid, but tab-driven). Learn/Build/Fly = 3-column uniform grid (3 equal cards). Footer = 3-column uniform link grid.
- Sticky header assumed (nav remains visible on scroll).
- All images use specified ratios (1.38:1 features, 1.00:1 / 1.50:1 thumbnails); no asymmetric alternation in project cards.
- Interaction: :focus-visible present on all links; prefers-reduced-motion honored (tab animations respect user setting).