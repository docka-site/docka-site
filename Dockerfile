FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy workspace root files
COPY pnpm-workspace.yaml package.json .npmrc* ./
COPY build.sh ./

# Copy backend and libraries
COPY artifacts/api-server ./artifacts/api-server
COPY lib ./lib

# Make build script executable and run it
RUN chmod +x build.sh && ./build.sh

# Expose port
EXPOSE 8082

# Start backend
WORKDIR /app/artifacts/api-server
CMD ["pnpm", "start"]
