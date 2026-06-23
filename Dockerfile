# --- Stage 1: Build Valkey and compilation tools ---
FROM node:22-bullseye AS builder

WORKDIR /app

# Install native compilation dependencies for Valkey
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy configuration and compilation scripts
COPY package*.json tsconfig.json ./
COPY build-valkey.sh build.ts ./
COPY src/ ./src/

# Compile Valkey binary and compile Typescript
RUN npm ci
RUN npm run build
RUN npx tsx build.ts

# --- Stage 2: Final runner environment ---
FROM node:22-bullseye-slim

WORKDIR /app

# Copy built Valkey executables into system PATH
COPY --from=builder /app/valkey/src/valkey-server /usr/local/bin/
COPY --from=builder /app/valkey/src/valkey-cli /usr/local/bin/

# Copy built typescript files and dependencies
COPY package*.json ./
RUN npm dependency-install --only=production || npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Expose native Valkey Port
EXPOSE 6379

# Boot step: Run Valkey Server in the background, then execute the app
ENV REDIS_URL="redis://127.0.0.1:6379"
CMD valkey-server --protected-mode no & npm start
 