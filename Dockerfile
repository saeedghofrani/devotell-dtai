# Build stage
FROM node:22.11.0-alpine AS builder

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

RUN npm run build


COPY . .

EXPOSE 40000

CMD ["node", "dist/main"]