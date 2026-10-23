#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "[1/2] Building Vite application..."
bun run build

echo "[2/2] Generating static HTML shell & Cloudflare Pages redirects..."
bun run generate-static.ts

echo "Done! Build directory for Cloudflare Pages: dist/client"
