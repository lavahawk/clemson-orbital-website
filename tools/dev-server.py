"""Local preview server for the site. Same as `python -m http.server`, but tells the browser not to
cache anything, so edits always show on reload. Usage: python tools/dev-server.py [port]"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    ThreadingHTTPServer(("", port), NoCacheHandler).serve_forever()
