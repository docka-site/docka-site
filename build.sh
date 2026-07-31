#!/bin/bash
set -e

echo "Installing dependencies with pnpm..."
cd /app/artifacts/api-server

# Install with ignore-optional to skip platform-specific deps
pnpm install --optional-dependencies=false

echo "Building backend..."
pnpm build

echo "Build complete!"
