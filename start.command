#!/bin/bash
# Double-click this file to run the prototype on a local web server.
# Serving over http:// (rather than file://) enables full browser storage,
# clipboard access and picture-in-picture in every browser.

cd "$(dirname "$0")" || exit 1

PORT=8777
while lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

echo "Baruch College Financial Group — local preview"
echo "Serving $(pwd)"
echo "→ http://localhost:$PORT/"
echo
echo "Press Control-C to stop."
echo

python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
sleep 1
open "http://localhost:$PORT/index.html"

cleanup() {
  echo
  echo "Stopping server."
  kill "$SERVER" 2>/dev/null
  wait "$SERVER" 2>/dev/null
  exit 0
}
trap cleanup INT TERM
wait "$SERVER"
