# ─── Stage 1: build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy manifest files first for layer caching
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy the rest of the source
COPY . .

RUN pnpm build:prod

# ─── Stage 2: serve ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install only production deps (vite is needed for preview)
RUN pnpm install --frozen-lockfile --prod

# Copy the built output from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 4173

CMD ["pnpm", "start:prod"]
