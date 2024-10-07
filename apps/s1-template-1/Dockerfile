FROM node:16.14.2-alpine AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16.14.2-alpine AS builder
WORKDIR /app
ARG TRANSFORM_CONFIG 
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
COPY missing-config.js apps/s1-template-1/public/c.js
RUN echo "Building with mode: ${TRANSFORM_CONFIG}"
RUN yarn nx build s1-template-1 --mode ${TRANSFORM_CONFIG}

FROM caddy:2.1.1-alpine AS runner
COPY --from=builder /app/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/apps/s1-template-1 /usr/share/caddy
