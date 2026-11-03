/*
  Contact links for the leadership cards on the Team page, keyed by the name in data/leadership.js.
  Kept apart from that file because tools/process-headshots.py rewrites it.
  Each entry can have `linkedin`, `site`, and `name` (to correct the name taken from the photo's file name).
  Anyone without an entry shows the team inbox instead. Only profiles confirmed to be the Clemson member are listed.
*/
window.LEADERSHIP_LINKS = {
  "Bryson Stills": { name: "Bryson Still", linkedin: "https://www.linkedin.com/in/bryson-still" },
  "Keller Hawkins": { site: "https://kellerhawkins.com" },
  "Rami Roushdie": { linkedin: "https://www.linkedin.com/in/ramiroushdie/" }
};
