# syntax=docker/dockerfile:1.7
# Multi-stage, non-root — the same shape as the platform's service images.

FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
# Baked into the client bundle and every canonical URL, so it is a build argument, not runtime config.
ARG NEXT_PUBLIC_SITE_URL=https://vybe.crokta.com
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3300 HOSTNAME=0.0.0.0
WORKDIR /app
RUN addgroup -S -g 10001 vybe && adduser -S -u 10001 -G vybe vybe
COPY --from=build --chown=vybe:vybe /app/.next/standalone ./
COPY --from=build --chown=vybe:vybe /app/.next/static ./.next/static
COPY --from=build --chown=vybe:vybe /app/public ./public
USER vybe
EXPOSE 3300
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:3300/robots.txt >/dev/null || exit 1
CMD ["node", "server.js"]
