---
version: "superdesign-alpha"
name: "Insignia Navy Institutional"
description: "A photo-hero collegiate system built on a deep navy-to-indigo duotone wash, a centered circular-badge emblem, and a flat white card grid for program listings, closing in a near-black footer band."
colors:
  background: "#183060"
  surface: "#FFFFFF"
  surface-footer: "#1E2939"
  text-primary: "#FFFFFF"
  text-ink: "#101828"
  text-on-dark-secondary: "#FFFFFF"
  accent: "#155DFC"
  link: "#155DFC"
typography:
  display-lg:
    fontFamily: "-apple-system"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: "1.4"
  headline-md:
    fontFamily: "-apple-system"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: "1"
  body-md:
    fontFamily: "-apple-system"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: "1.5"
  label-md:
    fontFamily: "-apple-system"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "1.33"
  icon-accent:
    fontFamily: "Font Awesome 6 Free"
    fontWeight: 900
    role: "social and UI glyphs (Discord, LinkedIn, YouTube, mail, Facebook)"
  icon-brand:
    fontFamily: "Font Awesome 6 Brands"
    role: "brand-mark glyphs within icon row"
spacing:
  base: "4px"
  gap: "32px"
  card-padding: "24px"
  section-padding: "64px"
  small-gap: "16px"
  medium-gap: "24px"
  tight-gap: "12px"
rounded:
  control: "6px"
  card: "8px"
  pill: "8px"
components:
  navbar:
    background: "transparent"
    width: "100% (edge-to-edge)"
    height: "56px"
    radius: "0px all corners"
    position: "sticky"
  button-primary:
    background: "#155DFC"
    text-color: "#FFFFFF"
    radius: "6px"
    height: "~48px"
    note: "observed solid blue rectangle, hero primary CTA"
  button-video-light:
    background: "#FFFFFF"
    text-color: "#101828"
    radius: "9999px"
    height: "~40px"
    note: "pill 'Sign in' control inside embedded video card"
  button-video-dark:
    background: "#1E2939"
    text-color: "#FFFFFF"
    radius: "9999px"
    height: "~40px"
    note: "pill 'Learn more' control beside the light pill"
  card-program:
    background: "#FFFFFF"
    radius: "8px"
    padding: "24px"
    shadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px"
    text-color: "#101828"
  footer:
    background: "#1E2939"
    text-color: "#FFFFFF"
---
# Insignia Navy Institutional
Source: https://space.uah.edu

## Overview
This is an institutional, collegiate-flat system: a full-bleed photographic hero under a solid navy duotone wash, centered on an emblematic circular badge mark, descending into flat white card modules on a solid navy band, and closing in a near-black footer. There is no glassmorphism, no gradient mesh, no dark-mode-default philosophy — surfaces are flat and opaque, shadows are reserved for a single soft elevation recipe, and the only real "effect" is the duotone photo treatment in the hero. The feel is civic/organizational rather than product-marketing: bold sans display type, generous circular insignia artwork, and a blue-link, white-card documentation register once past the fold.

## Composition
The first screen is a single full-bleed photographic band: a crowd photograph is overlaid with a flat navy wash, upon which sits a centered circular badge emblem, a large centered bold headline, a shorter centered subheadline, one centered solid-blue CTA, and a nav bar floating transparently across the very top. Immediately below the fold, the page breaks to a light-gray section pairing an embedded video card (left) against a text block (right) — a deliberate two-column asymmetric split that rejects the alternative of stacking video above text, keeping the explanatory copy visually anchored beside its supporting media rather than beneath it. Scrolling further, the page returns to the same navy tone used in the hero for a card-grid band ("Our Programs"), before terminating in a near-black footer strip. The rhythm is thus: dark photographic band → light neutral band → dark flat band → near-black footer, alternating value at each section boundary to mark transitions without dividers or shadows.

## Colors
Navy (`#183060`, the dominant hero/footer-band wash, ~29% of pixels) and a lighter indigo variant (`#303078`, ~14%) are the structural ink of the page, used as full-bleed section backgrounds both in the hero photo-wash and the repeated "Our Programs" band — this is a two-tone navy system, not one flat color. A near-white neutral (`#F0F0F0`, ~21%) and true white (`#FFFFFF`, ~12%) carry the light interstitial section and all card surfaces. A deep teal-navy (`#183030`, ~7%) and a secondary blue-navy (`#183078`, ~6%) appear as secondary photographic/wash variants, likely from the hero image's shadow regions. Solid blue (`#2563EB`-family) is the single rationed accent, appearing only on the hero's primary CTA and on inline text links ("Learn More") inside the white cards — never as a background fill elsewhere. Text ink on light surfaces is near-black (`#101828`); text on all dark navy surfaces is pure white (`#FFFFFF`). Red and orange token ramps are declared in the system (`#FEF2F2`, `#FB2C36`, `#C10007`, `#FFF7ED`, `#FFEDD4`, `#FFD6A8`, `#FF8904`) but are not visible in the sampled pixel field — treat these as reserved semantic-danger/warning ramps held in reserve, undeployed on this page.

## Typography
A single system sans (-apple-system) carries the entire hierarchy with no serif or editorial accent family in the copy — the only secondary families present are icon fonts (Font Awesome 6 Free/Brands) driving the social-glyph row, which functions as this system's "accent" layer in place of a decorative type. Hierarchy is built by size and weight rather than family change: a 48px/700/lh-1 headline-md anchors the hero, a 24px/400/lh-1.5 body-md carries the subheadline and card paragraph copy, a 24px/700/lh-1.33 label-md drives card titles and section headers, and a smaller 20px/700/lh-1.4 display-lg token covers nav-level and compact bold labels. Body text sits at 16px/400 at normal reading weight with white-on-dark or `#101828`-on-light depending on section.

## Layout
Content is capped at a 1536px max-width container. The program card grid is a strict 3-column grid with 32px gaps, holding 5 items in a composition of rows [3, 3, 3 | 2, 2] by width-share — concretely two rows: a full row of three equal 31%-width cards, then a second row of exactly two 31%-width cards left-aligned, leaving the third slot empty (not stretched) — this is a uniform card grid with a deliberately short final row, not a masonry or bento pattern. Section padding runs 64px top/bottom on the colored bands; internal spacing uses the 32/24/16/12/4px scale, with 24px as the standard card padding. Card corner radius is a modest 8px throughout; control/button radius sits at 6px. The layout is desktop-oriented and center-balanced, with no visible asymmetric column split other than the video/text pairing described above.

## Components
- **Navbar**: edge-to-edge, transparent background, 56px tall, spans the full 1920px viewport width with zero inset on either edge and 0px radius on all four corners (a true full-bleed square bar, not an inset or capsule). Holds a logo-plus-wordmark at left, then a horizontal run contributing to 32 total interactive items (top-level links plus dropdown-triggered sub-items under grouped labels), and a dark pill-shaped search input at the far right.
- **Hero primary CTA**: one solid rectangular button, observed near `#2563EB` fill, white text, ~6px corner radius (slightly-rounded, not pill), centered beneath the subheadline — the single highest-contrast, most isolated actionable element on the first screen.
- **Video-embed utility buttons**: a light pill (white fill, dark text, full 9999px radius) and an adjacent dark translucent pill (near-black semi-opaque fill, white text, full 9999px radius) sit stacked inside the embedded video card — these are media-player utility controls, not hero or nav actions, and must not be mistaken for the primary CTA.
- **Program card** (×5, in the navy "Our Programs" band): arranged 3-up then 2-up per the grid composition above. Surface is flat `#FFFFFF`, 8px radius, 24px padding, soft ambient shadow (`rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px` plus three zero-spread inset layers). Internal anatomy top-to-bottom: a centered circular badge/insignia illustration (roughly the top third of the card), a bold card title, one line of descriptive body copy, and a blue "Learn More" text link with a trailing arrow glyph at the bottom.
- **Embedded video/media card**: dark near-black card, rounded corners, containing a branded video-platform header row, a bold two-line prompt, a muted caption line, and the two pill buttons described above; a small caption line sits just below the card, outside its surface.
- **Social icon row**: a horizontal cluster of circular/flat icon glyphs (chat, professional network, video, mail, social) repeated once in the hero-adjacent column and once in the footer, rendered in the muted Font Awesome icon family.
- **Footer**: solid `#1E2939` band, white text and icon glyphs, holding the social icon row plus 10 flat text links in a single horizontal cluster — no columns, no newsletter field, no card structure.

## Graphics & Effects
The hero's defining graphic is a full-bleed photograph of an outdoor group scene overlaid with a flat navy color wash — this is a duotone/scrim treatment, not a gradient; it covers the entire hero viewport (the full first screen) and is the only large-scale photographic treatment on the page. Centered within it is a flat vector circular badge/insignia (a rocket-and-orbit motif inside a ringed seal), rendered in white/blue/accent-dot flat fill. The only measured shadow recipe is the soft dual-layer ambient shadow (`... rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px`) applied to the white program cards — a light, low-elevation lift, not a deep or colored shadow. No blur, glass, mesh gradient, or noise/grain texture is present anywhere in the system; all surfaces are flat and opaque.

## Motion
All interactive transitions share one timing recipe: a broad multi-property transition (`color, background-color, border-color, ... transform, translate, scale, rotate, filter, backdrop-filter, ... opacity`) at `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for standard state changes, with a faster `0.15s` variant of the same curve for lighter interactions (hover opacity, small transforms), plus a bare `opacity 0.15s ease` for simple fades and a dedicated `0.15s cubic-bezier(0.4,0,0.2,1)` transform-only transition for scale/translate micro-movements. A `fadeIn` keyframe is present for entrance reveals. The overall character is quick, restrained, and utilitarian — sub-300ms eased transitions on hover/focus states, no springy overshoot, no scroll-linked or parallax motion implied by the evidence.

## Guardrails
- Never render the hero background as a saturated full-gradient wash — it is a photograph under a flat navy scrim; keep the photographic layer visible beneath the color.
- Do not give the navbar an inset, centered, or pill shape — it is a true edge-to-edge square bar with zero corner radius.
- Do not assign the glass/pill video-player buttons to the hero's primary CTA role — the hero primary is a solid rectangular ~6px-radius blue button, distinct from the 9999px pill media controls.
- Keep the program-card grid's short second row (2 cards, not stretched to fill) — do not force a uniform 3-3 grid or convert it into bento/masonry spans.
- Reserve the red/orange ramps as unused semantic tokens; do not surface them as visible UI color on this page.
- Keep all card and footer surfaces flat and opaque — no blur, translucency, or glassmorphic treatment anywhere outside the hero's photographic scrim.