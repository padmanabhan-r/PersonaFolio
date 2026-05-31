#!/usr/bin/env bash
# Start the PersonaFolio dev server, freeing the port first.
# Usage: ./start.sh        (defaults to port 3000)
#        PORT=3001 ./start.sh

PORT="${PORT:-3000}"

echo "→ freeing port $PORT…"
lsof -ti:"$PORT" | xargs kill -9 2>/dev/null || true

echo "→ starting dev server on http://localhost:$PORT"
exec npm run dev
