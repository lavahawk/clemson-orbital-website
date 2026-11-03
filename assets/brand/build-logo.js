// Generates the Clemson Orbital mark, traced from the founding sketch (assets/brand/founding-sketch.png).
// Run from the repo root: node assets/brand/build-logo.js
//
// The points below were measured off the sketch's ink lines (sketch pixel space, 585 x 615).
// Each line is lightly smoothed, then drawn as a Catmull-Rom spline, so the mark keeps the sketch's sweep without its wobble.
const fs = require("fs");
const path = require("path");

const VIEWBOX = "36 0 520 580";
const SPHERE = { cx: 305, cy: 306, r: 230 };

// Six edge lines, each running from a feather tip up into the neck under the ship.
// A/B bound the upper feather, C/D the middle one, E/F the lower one.
const LINES = {
  A: [[58, 346], [80, 373], [110, 386], [140, 386], [200, 377], [260, 358], [300, 341], [340, 316], [380, 283], [416, 240], [437, 200], [448, 160], [449, 135], [442, 110], [438, 88]],
  B: [[58, 346], [66, 380], [80, 401], [102, 420], [146, 440], [200, 443], [260, 429], [300, 410], [340, 385], [380, 350], [420, 300], [451, 240], [461, 200], [464, 160], [462, 135], [455, 108]],
  C: [[112, 461], [140, 472], [200, 470], [260, 451], [300, 432], [340, 409], [380, 379], [420, 336], [444, 300], [463, 260], [474, 220], [477, 190], [474, 160], [468, 135], [458, 108]],
  D: [[112, 461], [125, 480], [154, 500], [200, 514], [260, 507], [300, 491], [340, 467], [380, 433], [420, 391], [456, 340], [476, 300], [487, 260], [491, 220], [489, 185], [482, 155], [472, 130], [460, 108]],
  E: [[224, 540], [260, 543], [300, 531], [340, 509], [380, 478], [420, 441], [460, 391], [480, 355], [500, 300], [506, 255], [504, 205], [496, 165], [484, 135], [466, 110]],
  F: [[224, 540], [262, 552], [300, 554], [340, 546], [380, 527], [415, 500], [452, 460], [479, 420], [496, 380], [507, 340], [514, 300], [516, 255], [512, 205], [501, 160], [488, 130], [470, 108]],
};

// The ship: a curved fin with the notch from the sketch. Corners are rounded, not pointed.
const SHIP_TOP = [[338, 18], [362, 15], [392, 22], [421, 40], [442, 61]];
const SHIP_NOTCH = [[442, 61], [428, 58], [414, 61], [427, 72], [438, 84]];
const SHIP_BOTTOM = [[338, 18], [358, 40], [380, 60], [405, 78], [430, 90], [458, 102], [472, 110]];

// Light cleanup of the hand-traced points: a few passes of a [1 2 1] blur on the interior points
// irons out the tracing wobble while every endpoint (tips, neck, the ship's nose) stays put.
function smoothed(pts, passes = 3) {
  let p = pts.map((v) => v.slice());
  for (let n = 0; n < passes; n++) {
    p = p.map((v, i) => (i === 0 || i === p.length - 1 ? v : [(p[i - 1][0] + 2 * v[0] + p[i + 1][0]) / 4, (p[i - 1][1] + 2 * v[1] + p[i + 1][1]) / 4]));
  }
  return p;
}
for (const k of Object.keys(LINES)) LINES[k] = smoothed(LINES[k]);
for (const pts of [SHIP_TOP, SHIP_BOTTOM]) pts.splice(0, pts.length, ...smoothed(pts, 2));

const STROKE = 10;
const ORANGE = "#F56600";
// A clean diagonal light across the globe: lighter at the top left, Clemson orange through the middle,
// a deeper burnt orange toward the bottom right.
const GLOBE_SHADE = [[0, "#FF8F3F"], [0.45, ORANGE], [1, "#B84A00"]];

/* Catmull-Rom through points -> cubic Bezier segments (no leading M). */
function spline(pts) {
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}
const r = (n) => Math.round(n * 10) / 10;
const open = (pts) => `M${pts[0][0]} ${pts[0][1]}${spline(pts)}`;
const rev = (pts) => pts.slice().reverse();
const closed = (a, b) => `${open(a)} L ${b[b.length - 1][0]} ${b[b.length - 1][1]}${spline(rev(b))} Z`;

const FEATHERS = [closed(LINES.A, LINES.B), closed(LINES.C, LINES.D), closed(LINES.E, LINES.F)];
// The ship is the fin alone: its tail ends where the trails meet it, with no joining block.
const SHIP_BODY = `M${SHIP_TOP[0][0]} ${SHIP_TOP[0][1]}${spline(SHIP_TOP)}${spline(SHIP_NOTCH)} L 458 102${spline(rev(SHIP_BOTTOM.slice(0, -1)))} Z`;
const NECK = "M436 86 L 474 108 L 488 132 L 446 132 Z";
// Where the trails join the ship: part of the sweeps, so it stays even though the ship is the fin alone.
const CONNECTOR = "M438 84 L 438 110 L 470 110 L 458 102 Z";

const PATHS = {
  lines: Object.values(LINES).map(open),
  shipOutline: [open(SHIP_TOP) + spline(SHIP_NOTCH), open(SHIP_BOTTOM)],
  feathers: FEATHERS,
  shipBody: SHIP_BODY,
  neck: NECK,
};

function mark({ ink, idPrefix = "co", outlineSphere = false }) {
  const cutouts = [...FEATHERS, NECK].map((d) => `<path d="${d}" fill="#000"/>`).join("");
  const shade = GLOBE_SHADE.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");
  return `<defs>
    <linearGradient id="${idPrefix}-globe" x1="0.18" y1="0.08" x2="0.82" y2="0.96">${shade}</linearGradient>
    <mask id="${idPrefix}-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="640"><rect width="640" height="640" fill="#fff"/>${cutouts}</mask>
  </defs>
  <g class="co-sphere" mask="url(#${idPrefix}-cut)">
    <circle cx="${SPHERE.cx}" cy="${SPHERE.cy}" r="${SPHERE.r}" fill="url(#${idPrefix}-globe)"/>${outlineSphere ? `
    <circle cx="${SPHERE.cx}" cy="${SPHERE.cy}" r="${SPHERE.r}" fill="none" stroke="${ink}" stroke-width="${STROKE}"/>` : ""}
  </g>
  <g class="co-trails" fill="none" stroke="${ink}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">
    ${PATHS.lines.map((d, i) => `<path class="co-line co-line-${"abcdef"[i]}" d="${d}"/>`).join("\n    ")}
    <path class="co-neck" d="${CONNECTOR}" fill="${ink}"/>
  </g>
  <path class="co-ship" d="${SHIP_BODY}" fill="${ink}" stroke="${ink}" stroke-width="${STROKE}" stroke-linejoin="round"/>`;
}

const svg = (body, title = "Clemson Orbital") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

const out = (file, text) => fs.writeFileSync(path.join(__dirname, "..", file), text);
// The outlined sphere matches the sketch; the "solid" variant drops the outline.
out("logo.svg", svg(mark({ ink: "#F4F2EE", outlineSphere: true })));                       // dark backgrounds (default)
out("brand/logo-on-light.svg", svg(mark({ ink: "#1C1820", outlineSphere: true })));        // light backgrounds
out("brand/logo-currentcolor.svg", svg(mark({ ink: "currentColor", outlineSphere: true }))); // inline: lines follow text colour
out("brand/logo-solid.svg", svg(mark({ ink: "#F4F2EE" })));                                // no sphere outline
out("brand/logo-paths.json", JSON.stringify({ viewBox: VIEWBOX, sphere: SPHERE, stroke: STROKE, ...PATHS }, null, 2) + "\n");
console.log("logo files written");
