# 1st stage: build backend
FROM node:lts-alpine AS backend-builder

WORKDIR /app
COPY backend/package.json backend/pnpm-lock.yaml backend/tsconfig*.json ./
RUN npm i -g pnpm
RUN pnpm i

COPY backend/src ./src
RUN pnpm build

# 2nd stage: build frontend
FROM node:lts-alpine AS frontend-builder

WORKDIR /app
COPY frontend/package.json frontend/pnpm-lock.yaml frontend/tsconfig*.json frontend/index.html frontend/vite.config.ts ./
RUN npm i -g pnpm
RUN pnpm i

COPY frontend/src ./src
RUN pnpm build

# 3rd stage: build final image
FROM node:lts-alpine

WORKDIR /app

# Install production deps only with pnpm
COPY backend/package.json backend/pnpm-lock.yaml backend/database.json ./
COPY backend/migrations ./migrations

# Copy dist folders from previous stages
COPY --from=backend-builder /app/dist ./dist
COPY --from=frontend-builder /app/dist ./dist/frontend-dist

# Install pnpm
RUN npm i -g pnpm

# Install production deps
RUN pnpm install --prod
# Install db-migrate and db-migrate-sqlite3
RUN pnpm install -D db-migrate db-migrate-sqlite3

ENV NODE_ENV=production

CMD ["pnpm", "start"]