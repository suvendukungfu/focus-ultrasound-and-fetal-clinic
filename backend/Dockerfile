# ══════════════════════════════════════════════════════
# Focus Backend — Production Docker Image
# Multi-stage build for minimal image size
# ══════════════════════════════════════════════════════

# ─── Stage 1: Install dependencies ───────────────────
FROM node:22-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ─── Stage 2: Build TypeScript ───────────────────────
FROM node:22-slim AS builder
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
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 focusapp
USER focusapp

# Copy production dependencies
COPY --from=deps --chown=focusapp:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=focusapp:nodejs /app/dist ./dist
COPY --from=builder --chown=focusapp:nodejs /app/prisma ./prisma
COPY --from=builder --chown=focusapp:nodejs /app/package.json ./

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "fetch('http://localhost:4000/api/v1/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.js"]
