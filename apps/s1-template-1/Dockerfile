FROM node:16.14.2-stretch-slim AS dependencies
WORKDIR /app
ENV YARN_CACHE_FOLDER=/root/.yarn

RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
     yarn cache dir && yarn cache list

COPY package.json yarn.lock ./
RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
     yarn install --frozen-lockfile

FROM node:16.14.2-stretch-slim AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY ./libs ./libs
COPY ./apps/s1-template-1 ./apps/s1-template-1
COPY ./caddy ./caddy
COPY .editorconfig tsconfig.base.json .eslintrc.json .eslintignore nx.json .nxignore package.json ./
RUN yarn nx build s1-template-1

FROM caddy:2.1.1-alpine AS runner
COPY --from=builder /app/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/apps/s1-template-1 /usr/share/caddy
