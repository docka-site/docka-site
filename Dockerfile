FROM node:22-alpine

WORKDIR /app

# Copy ONLY backend package.json
COPY artifacts/api-server/package.json artifacts/api-server/package.json
COPY artifacts/api-server/package-lock.json artifacts/api-server/package-lock.json 2>/dev/null || true

# Copy source code
COPY artifacts/api-server/src ./artifacts/api-server/src
COPY artifacts/api-server/tsconfig.json ./artifacts/api-server/tsconfig.json 2>/dev/null || true

# Install dependencies using npm (not pnpm, to avoid workspace issues)
WORKDIR /app/artifacts/api-server
RUN npm install --omit=dev

# Build
RUN npm run build || npx tsc

# Expose port
EXPOSE 8082

# Start
CMD ["npm", "start"]
