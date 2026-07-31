FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy workspace root files
COPY pnpm-workspace.yaml package.json .npmrc* ./

# Copy backend only
COPY artifacts/api-server ./artifacts/api-server
COPY lib ./lib

# Install dependencies (all workspace packages, but we'll only run backend)
RUN pnpm install --frozen-lockfile=false

# Build backend
WORKDIR /app/artifacts/api-server
RUN pnpm build

# Expose port
EXPOSE 8082

# Start backend
CMD ["pnpm", "start"]
