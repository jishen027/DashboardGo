# ── Stage 1: install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Stage 3: production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Unprivileged user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone output (server + minimal node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static assets served by Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static

# Bake in the example config as the default.
# The compose volume mount overlays this with the host's persistent file at runtime.
COPY --from=builder --chown=nextjs:nodejs /app/dashy-config.example.json ./dashy-config.json

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
