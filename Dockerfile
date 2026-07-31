FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy minimal workspace files (no frontend files)
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY .npmrc ./.npmrc

# Copy ONLY backend and its shared libs
COPY lib ./lib
COPY artifacts/api-server ./artifacts/api-server

# Install with --optional-dependencies=false to skip platform-specific deps
WORKDIR /app
RUN pnpm install --optional-dependencies=false --filter @workspace/api-server 2>&1 | grep -v "ERR_PNPM" || true

# Build backend
WORKDIR /app/artifacts/api-server
RUN pnpm build

# Expose port
EXPOSE 8082

# Start
CMD ["pnpm", "start"]
