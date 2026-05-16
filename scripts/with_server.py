#!/usr/bin/env python3
"""
Run a command with the Next.js dev server in the background.

Usage:
    python3 scripts/with_server.py -- <command> [args...]
    python3 scripts/with_server.py -- pnpm exec playwright test
    python3 scripts/with_server.py --help

The script starts `pnpm dev` in the background, waits for the server
to be ready on http://localhost:3000, runs the given command, then
shuts down the server.
"""

import argparse
import subprocess
import sys
import time
import urllib.request
import urllib.error
import os
import signal


def wait_for_server(url: str, timeout: int = 60) -> bool:
    """Poll until the server responds or timeout is reached."""
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            req = urllib.request.urlopen(url, timeout=2)
            req.close()
            return True
        except (urllib.error.URLError, OSError):
            time.sleep(0.5)
    return False


def main():
    parser = argparse.ArgumentParser(
        description="Run a command with the Next.js dev server in the background."
    )
    parser.add_argument(
        "--url",
        default="http://localhost:3000",
        help="URL to poll for server readiness (default: http://localhost:3000)",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=60,
        help="Seconds to wait for the server to start (default: 60)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=3000,
        help="Port for the dev server (default: 3000)",
    )
    parser.add_argument(
        "command",
        nargs=argparse.REMAINDER,
        help="Command to run after the server is ready. Prefix with -- to separate.",
    )

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    # Strip leading -- if present
    cmd = args.command
    if cmd and cmd[0] == "--":
        cmd = cmd[1:]

    if not cmd:
        parser.print_help()
        sys.exit(1)

    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Start dev server
    print(f"[with_server] Starting pnpm dev on port {args.port}...")
    server_proc = subprocess.Popen(
        ["pnpm", "dev", "--port", str(args.port)],
        cwd=project_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )

    try:
        # Wait for server to be ready
        print(f"[with_server] Waiting for {args.url} (timeout: {args.timeout}s)...")
        if not wait_for_server(args.url, args.timeout):
            print("[with_server] ERROR: Server did not start in time.")
            server_proc.terminate()
            sys.exit(1)

        print("[with_server] Server is ready. Running command...")
        print(f"[with_server] $ {' '.join(cmd)}")
        print("-" * 60)

        # Run the user's command
        result = subprocess.run(cmd, cwd=project_dir)
        exit_code = result.returncode

    finally:
        # Shut down the server
        print("\n[with_server] Shutting down dev server...")
        server_proc.terminate()
        try:
            server_proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server_proc.kill()
            server_proc.wait()

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
