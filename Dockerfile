FROM node:22.11.0-alpine

# Install dependencies
RUN apk add --no-cache curl

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Expose the app port
EXPOSE 40000

# Start the application
CMD ["node", "dist/main.js"]