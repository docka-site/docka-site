FROM node:22-alpine

WORKDIR /app/artifacts/api-server

# Install pnpm
RUN npm install -g pnpm@latest

# Copy backend files ONLY
COPY artifacts/api-server/package.json ./
COPY artifacts/api-server/pnpm-lock.yaml* ./ 2>/dev/null || true
COPY artifacts/api-server/src ./src
COPY artifacts/api-server/tsconfig.json ./tsconfig.json 2>/dev/null || true
COPY artifacts/api-server/build.mjs ./build.mjs 2>/dev/null || true

# Copy shared libraries
COPY lib /app/lib

# Set environment to skip problematic dependencies
ENV PNPM_SKIP_PLATFORM_CHECK=true
ENV npm_config_platform=linux

# Install dependencies WITHOUT workspace resolution
RUN pnpm install --frozen-lockfile=false --no-optional 2>&1 | tail -20

# Build backend
RUN pnpm build

# Expose port
EXPOSE 8082

# Start
CMD ["pnpm", "start"]
