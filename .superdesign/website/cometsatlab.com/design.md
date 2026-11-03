---
version: "superdesign-alpha"
name: "Orbital grain monochrome"
description: "Near-black flight-manual system where a single saturated orange marks the one interactive accent against a deep forest-green technical palette, carried by oversized condensed display type and hairline rules."
colors:
  background: "#000000"
  surface-panel: "#00633C"
  surface-paper: "#DCE6DE"
  text-primary: "#FFFFFF"
  text-secondary: "#A0A0A0"
  text-on-panel: "#334B3C"
  accent: "#FF7900"
  border: "#595959"
  border-on-panel: "#264735"
typography:
  display-lg:
    fontFamily: "Inter Tight"
    fontSize: "160px"
    fontWeight: 700
    lineHeight: "0.96"
    letterSpacing: "-8.8px"
  headline-md:
    fontFamily: "Inter Tight"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: "1.15"
    letterSpacing: "-0.8px"
  body-md:
    fontFamily: "Inter Tight"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "1.4"
  label-md:
    fontFamily: "Inter Tight"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "1.05"
    letterSpacing: "0.5px"
  label-mono:
    fontFamily: "IBM Plex Mono"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.5px"
spacing:
  base: "8px"
  gap: "18px"
  section-padding: "128px"
rounded:
  control: "2px"
  card: "2px"
  pill: "2px"
components:
  button-ghost:
    background: "transparent"
    text-color: "#FFFFFF"
    radius: "0px"
    height: "51px"
    padding: "17px 0px 16px"
    border: "none"
  button-primary-hero:
    background: "#FF7900 (observed solid fill)"
    text-color: "#000000 (observed)"
    radius: "2px (observed, sharp)"
    height: "~48px (observed)"
    padding: "observed ~16px 28px"
  card-panel-inverted:
    background: "#00633C"
    radius: "0px"
    padding: "32px"
    border-top: "accent #FF7900 hairline"
  card-paper:
    background: "#DCE6DE"
    radius: "0px"
    padding: "28px"
  card-accordion:
    background: "transparent"
    radius: "0px"
    padding: "0px"
    border-top: "1px solid #595959"
---
# Orbital grain monochrome
Source: https://cometsatlab.com

## Overview
This is a dark-mode-default technical/editorial system — closer to a flight manual or mission dossier than a conventional SaaS marketing page. The pixel field is overwhelmingly black (~72%), with a second, deliberate register of deep forest-green panels (#006048/#00633C family, ~16% combined) and a near-white paper tone (#DCE6DE) used sparingly for contrast cards. Orange (#FF7900) is the single branded accent, rationed to headline fragments, hairline rule-tops, nav active states, and orbital-diagram linework. Oversized Inter Tight display type at a severe negative tracking (-8.8px at 160px) carries the hero; IBM Plex Mono labels in small caps supply a technical, instrumentation-panel voice for coordinates, section counters, and diagram captions. The overall language is Swiss/International in its grid discipline and zero-radius geometry, crossed with an aerospace-schematic mood from the orbital illustration and dotted starfield.

## Composition
The first screen is a classic split: a massive two-line display headline fills the left ~60%, a single photographic card of hardware occupies the right, and a short two-column text strip (eyebrow label + one paragraph) sits below, divided by a hairline rule. Below the fold, the rhythm alternates between full-bleed black sections holding an orbital-diagram illustration with mono-label captions, and a green-and-paper card grid introducing a tabbed capability section. Further down, a three-up pitch ("Learn/Build/Fly"-style oversized words) sits atop a row of three cards mixing inverted-green and paper surfaces. The page closes on a sparse, text-led contact/footer zone with two accordion rows and a four-column link footer. The deliberate choice is restraint: content is concentrated into few, very large gestures (one giant headline, one hero image, one diagram) rather than dense feature grids — rejecting a conventional packed bento layout in favor of generous black negative space punctuated by rare, saturated green/orange interruptions.

## Colors
Black (#000000) is the page background and dominant surface at roughly three-quarters of rendered pixels, establishing the instrumentation-panel mood. Deep green (#00633C/#006048, ~16-19% combined) is the secondary surface role, used as inverted card fills that read as a "data panel" against the black page. Paper green-white (#DCE6DE, ~10%) is a tertiary card surface giving light contrast cards without ever going true white — true white (#FFFFFF) is reserved almost exclusively for text ink and is under 1% of pixels. Orange (#FF7900) is the sole accent hue, appearing only on the active nav label, hairline card-top borders, and orbital-path strokes in the diagram — never as a fill larger than a rule or small icon. Muted gray (#A0A0A0) carries secondary/caption text and hairline dividers (#595959 borders, #264735 borders on green panels). Nothing else is colored: buttons, icons, and body copy stay in black/white/gray, keeping orange legible as the only "click here" signal.

## Typography
Inter Tight is the sole UI/display family, deployed at extreme scale contrast: a 160px/700 display headline with -8.8px tracking for the hero, dropping to a 40px/400 headline at -0.8px for section titles, then 13px/400 body copy and 12px/500 label text at +0.5px tracking for eyebrows and captions. IBM Plex Mono appears as the accent/label-mono face for diagram captions and small coordinate-style tags ("ORBITAL CONCEPT"-style annotations, counters like "01/04"), giving a schematic, data-readout character distinct from the humanist Inter Tight body. Hierarchy is built almost entirely through size jump and tracking rather than color or weight — weight stays mostly regular/medium throughout except the bold display headline.

## Layout
Content is held to a 600px measure for body paragraphs but the overall canvas runs full-bleed edge-to-edge for diagrams and the navbar. Section padding is a generous 128px vertical rhythm, with internal gaps tightening to 18-20px within grids. Card grids are explicitly zero-radius and low-gap: a 3-column/3-item row at equal 33/33/33 widths (the Learn/Build/Fly card trio), a 3-column/5-item grid at 29/31 widths with a trailing row, and a 6-column/4-item utility grid at tight 11-16% item widths for the capability tab strip. A two-item full-width accordion stack (two rows at 100/100) handles the closing contact section. The system favors uniform card-grid rows over masonry or bento asymmetry — composition is "rows of equal cards" throughout, the one exception being the hero's asymmetric text/image split and a nested 85/49 + 113 tile cluster on the first screen's background diagram layer.

## Components
- **Navbar**: edge-to-edge square bar, 72px tall, spans full 1920px viewport width with 0px inset on either side, all four corners 0px radius (true full-bleed rectangle, not inset/capsule), sticky on scroll, fill #000000, holds a logo lockup (mark + two-line wordmark) at far left, 10 total items including a plain-text nav list and one accent-colored CTA label rendered in orange, plus two right-aligned utility links.
- **Button — ghost/nav** (×4 measured mid-page): transparent fill, white text, 0px radius, 51px height, 17px/0/16px padding, no visible border — used for in-page tab controls and secondary actions.
- **Button — hero primary** (observed, not in measured set): a solid orange (#FF7900) fill with dark text, sharp near-0-2px corners, sitting as the standalone high-contrast CTA under/beside the headline — this is the single emphasized action on the first screen; do not substitute the transparent ghost-button spec for it.
- **Card — inverted green panel** (×4, mid-page capability section): fill #00633C, 0px radius, 32px padding, orange hairline top border, anatomy top-to-bottom: small mono eyebrow/counter, icon, heading, body paragraph — used as the "active tab" detail panel.
- **Card — paper panel** (×3, the Learn/Build/Fly trio): fill #DCE6DE, 0px radius, 28px padding, anatomy: full-bleed top illustration (flat vector icon on green-gradient backdrop) covering roughly half the card height, heading below, then a labeled two-row fact list (Focus/Explore/Approach-style label-value pairs separated by hairlines).
- **Diagram panel / hero illustration**: full-bleed black canvas holding a flat-vector orbital CubeSat illustration with orange orbit-path strokes, a dotted starfield, and mono-label captions anchored at the panel's bottom corners — appears once on first screen as the hero photographic card, and again as a large standalone section further down.
- **Accordion row** (×2, near page end): transparent fill, 0px radius, 0px padding, full-width rows at 100/100 stacked, each with an orange plus-glyph at left, a single-line label, and a hairline divider above/below; expands to reveal body text.
- **Footer**: transparent background, 15 links organized into labeled columns (mono-style uppercase small-caps group headers) beneath a hairline rule, logo lockup repeated at far left.
- **Capability tab strip** (6-column utility grid, 4 items): transparent, 0px radius, numbered mono labels ("01/04"-style) with an orange underline/indicator on the active item, functioning as an in-page tab bar above the inverted-panel detail card.

## Graphics & Effects
The dominant graphic is a flat-vector orbital/satellite illustration rendered in green gradient tones (`#006048`→`#003018`→`#001818`-family dark greens) over black, with a thin orange stroke tracing an orbital path and small dotted accents standing in for a starfield texture — this illustration covers roughly the full width of its section and a large vertical span, not a small corner element. A faint dot-grid/starfield texture is scattered across black sections at low density, reinforcing the instrumentation mood rather than acting as full noise/grain. The hero's photographic hardware image sits in a single bounded rectangle (not full-bleed), unscrimmed, framed by surrounding black. Card-top hairline borders in orange function as a signature "panel activation" stroke rather than a shadow — there is no drop-shadow elevation language in this system; depth is communicated through flat color-layer stacking (black → green panel → paper panel) rather than blur or shadow.

## Motion
Interactions are quick and utilitarian: color and opacity transitions run at `0.2s ease` for hover/link state changes. Panel and dialog reveals use a slightly longer `0.25s` transform/opacity pair on a plain `ease` curve. The signature entrance motion is slower and more cinematic: a `0.75s` transform/opacity transition on `cubic-bezier(0.16, 1, 0.3, 1)` (a pronounced ease-out) driving named keyframes — hero-enter, panel-in, dialog-in, headline-rise, trace-orbit — which together stagger the display headline's rise, the orbital diagram's path-tracing, and panel fade-ins as the user scrolls. A blink-cursor keyframe suggests a terminal/typewriter caret accent somewhere in the type treatment, reinforcing the instrumentation voice.

## Guardrails
- Never round the card or button corners — every surface in this system is 0px, sharp-edged; any radius above ~2px breaks the schematic identity.
- Keep orange confined to single accents (one nav label, hairline borders, orbit strokes, the primary CTA) — never let it fill a large panel or become a secondary palette color.
- Do not lighten the page background: black must stay the dominant ~70%+ surface; green panels are a minority accent layer, not a competing background.
- Preserve the extreme negative letter-spacing on display type; positive or neutral tracking at that size collapses the system's technical character.
- Do not add drop shadows or blur-based elevation — depth comes from flat color layering only.
- Keep IBM Plex Mono exclusive to labels/captions/counters; never use it for body paragraphs or headlines.