FROM node:22-alpine

WORKDIR /app

# Copy workspace libs FIRST (needed by backend build)
COPY lib ./lib

# Copy backend files
COPY artifacts/api-server/package.json ./package.json
COPY artifacts/api-server/src ./src
COPY artifacts/api-server/tsconfig.json ./tsconfig.json
COPY artifacts/api-server/build.mjs ./build.mjs

# Install dependencies using plain npm (no pnpm, no workspace)
RUN npm install --production=false --legacy-peer-deps

# Build backend
RUN npm run build

# Remove dev dependencies for production
RUN npm prune --production

# Expose port
EXPOSE 8082

# Start
CMD ["npm", "start"]
