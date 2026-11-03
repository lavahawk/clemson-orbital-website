# Leadership headshots

Drop each leader's original photo in this folder, named with their full name (for example `Jane Doe.jpg`). Then run, from the repo root:

```bash
python tools/process-headshots.py
```

The script finds each face, crops a square around it so every portrait is framed the same, evens out exposure and contrast across the set, and saves web-sized copies to `web/`. It also rewrites `data/leadership.js`, naming everyone from the file names.

Cards show just the name for now. To add a role or a line about someone's area, add `role` and `area` to their entry in `data/leadership.js` (re-running the script resets that file, so add them after the last run).

The originals here are never changed. The script needs `python -m pip install --user "opencv-python-headless<5" pillow` once.
