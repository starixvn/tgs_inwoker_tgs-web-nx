FROM node:16.14.2-stretch-slim AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:16.14.2-stretch-slim AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn nx build tgs-web-t29

FROM caddy:2.1.1-alpine AS runner
COPY --from=builder /app/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/apps/tgs-web-t29 /usr/share/caddy
