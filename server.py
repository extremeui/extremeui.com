#!/usr/bin/env python3
"""
Simple HTTP server for Extreme Pixel UI Android Customizer Website.
Serves index.html with correct MIME types and automatic port selection.
"""
import http.server
import socketserver
import os
import sys

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = PORT
    max_retries = 10
    
    for attempt in range(max_retries):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                print(f"=====================================================")
                print(f"✨ Extreme Pixel UI Web is live at: http://localhost:{port}")
                print(f"📁 Serving directory: {os.getcwd()}")
                print(f"Press Ctrl+C to stop the server.")
                print(f"=====================================================")
                httpd.serve_forever()
                break
        except OSError as e:
            if attempt < max_retries - 1:
                port += 1
            else:
                print(f"Could not bind to any port: {e}", file=sys.stderr)
                sys.exit(1)

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\nServer gracefully stopped.")
