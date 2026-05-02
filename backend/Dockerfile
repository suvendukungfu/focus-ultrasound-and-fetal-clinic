# ══════════════════════════════════════════════════════
# Focus Backend — Production Docker Image
# Multi-stage build for minimal image size
# ══════════════════════════════════════════════════════

# ─── Base: Runtime libraries required by Prisma ──────
FROM node:22-slim AS base
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# ─── Stage 1: Install dependencies ───────────────────
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci --omit=dev
RUN npx prisma generate

# ─── Stage 2: Build TypeScript ───────────────────────
FROM base AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY prisma ./prisma/
COPY src ./src/

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript
RUN npx tsc --outDir dist

# ─── Stage 3: Production image ──────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 focusapp && \
    mkdir -p /app/logs && \
    chown -R focusapp:nodejs /app/logs

# Copy production dependencies
COPY --from=deps --chown=focusapp:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=focusapp:nodejs /app/dist ./dist
COPY --from=builder --chown=focusapp:nodejs /app/prisma ./prisma
COPY --from=builder --chown=focusapp:nodejs /app/package.json ./

USER focusapp

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "fetch('http://localhost:4000/api/v1/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.js"]
