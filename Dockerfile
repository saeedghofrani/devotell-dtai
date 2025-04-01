# Build stage
FROM node:22.11.0-alpine AS builder

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
# FROM node:22.11.0-alpine

# WORKDIR /app

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/.env ./
# COPY --from=builder /app/.env.development ./

EXPOSE 40000

CMD ["node", "dist/main"]