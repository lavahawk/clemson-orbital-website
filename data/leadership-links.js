/*
  Contact links for the leadership cards on the Team page, keyed by the name in data/leadership.js.
  Kept apart from that file because tools/process-headshots.py rewrites it.
  Each entry can have `linkedin`, `site`, and `name` (to correct the name taken from the photo's file name).
  Anyone without an entry shows the team inbox instead.
*/
window.LEADERSHIP_LINKS = {
  "Ben Shaughnessy": { linkedin: "https://www.linkedin.com/in/ben-shaughnessy/" },
  "Bryson Stills": { name: "Bryson Still", linkedin: "https://www.linkedin.com/in/bryson-still" },
  "Carter Miller": { linkedin: "https://www.linkedin.com/in/carter-miller-26a1933b0/" },
  "Cayden Johnson": { linkedin: "https://www.linkedin.com/in/cayden-johnson-8b29072a9/" },
  "Keller Hawkins": { linkedin: "https://www.linkedin.com/in/kellerhawkins/", site: "https://kellerhawkins.com" },
  "Nicholas Charles Kimmel Jr.": { name: "Nicholas Kimmel Jr.", linkedin: "https://www.linkedin.com/in/nicholas-kimmel-jr/" },
  "Noah Childers": { linkedin: "https://www.linkedin.com/in/noah-childers-2886423ab/" },
  "Pablo Contreras": { linkedin: "https://www.linkedin.com/in/the-pablo-contreras/" },
  "Rami Roushdie": { linkedin: "https://www.linkedin.com/in/ramiroushdie/" }
};
