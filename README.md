# NestJS + TypeORM + PostgreSQL

## 📌 Project Overview

This is a backend project built using **NestJS** with **TypeORM** as the ORM and **PostgreSQL** as the database. The project follows best practices, including code formatting with **Prettier**, linting with **ESLint**, and a structured migration strategy using **TypeORM** migrations.

## 🚀 Features

- **NestJS Framework** for a modular and scalable backend
- **TypeORM** integration with PostgreSQL
- **Database Migrations** for versioning schema changes
- **ESLint & Prettier** for consistent code quality
- **Dockerized** for easy deployment
- **Health Check API** for monitoring service status
- **Environment Variable Support** for configuration flexibility

---

## 📂 Project Structure

```
/app
│── src/
│   ├── api/        # Feature-based modules
│   ├── controllers/    # Controllers handling requests
│   ├── common/         # Shared Service
│   ├── config/         # Configuration Services
│   ├── database/
│   │   ├── migrations/ # Database migrations
│   │   ├── entities/   # Database entities (TypeORM)
│   │   ├── provider/   # Data source configuration
│   ├── main.ts         # Entry point of the app
│── test/               # e2e tests
│── .env                # Environment variables
│── Dockerfile          # Docker configuration
│── docker-compose.yml  # Docker Compose setup
│── package.json        # Node package configuration
│── README.md           # Documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v22.11.0 recommended)
- **PostgreSQL** (v15 recommended)
- **Docker** (optional, for containerized setup)

### Step 1: Clone the repository

```sh
git clone <your-repository-url>
cd <your-repository-name>
```

### Step 2: Install dependencies

```sh
npm install
```

### Step 3: Set up environment variables

Create a `.env` file in the root directory and configure the following variables:

```env
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_database_name
PORT=40000
```

### Step 4: Run the application

#### Development Mode

```sh
npm run start:dev
```

#### Production Mode

```sh
npm run build
npm run start:prod
```

#### Running with Docker

```sh
docker-compose up --build
```

---

## 📜 Available Scripts

```json
"scripts": {
  "build": "nest build",
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
  "start": "nest start --env-file=.env",
  "start:dev": "nest start --env-file=.env.development --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:e2e": "jest --config ./test/jest-e2e.json --detectOpenHandles",
  "migration:generate": "typeorm-ts-node-commonjs migration:generate src/database/migrations/%npm_config_name% -d src/database/provider/datasource.ts",
  "migration:run": "typeorm-ts-node-commonjs migration:run -d src/database/provider/datasource.ts",
  "migration:revert": "typeorm-ts-node-commonjs migration:revert -d src/database/provider/datasource.ts"
}
```

---

## 🐳 Docker Setup

The project includes **Docker** and **Docker Compose** support.

### Running with Docker Compose

```sh
docker-compose up --build
```

### Stopping the containers

```sh
docker-compose down
```

#### `docker-compose.yml` Overview

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '40000:40000'
    env_file:
      - .env
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:40000/api/v1/health']
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped
    volumes:
      - ./:/app
      - /app/node_modules
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${DB_USERNAME} -d ${DB_DATABASE}']
      interval: 5s
      timeout: 5s
      retries: 5
volumes:
  postgres_data:
```

---

## ✅ Code Quality & Linting

- **Prettier** for formatting:
  ```sh
  npm run format
  ```
- **ESLint** for linting:
  ```sh
  npm run lint
  ```

---

## 🧪 Testing

- **Run unit tests:**
  ```sh
  npm run test
  ```
- **Run tests in watch mode:**
  ```sh
  npm run test:watch
  ```
- **Run end-to-end (E2E) tests:**
  ```sh
  npm run test:e2e
  ```
- **Check test coverage:**
  ```sh
  npm run test:cov
  ```

---

## 📜 Migrations

- **Generate migration:**
  ```sh
  npm run migration:generate --name=<migration_name>
  ```
- **Run migration:**
  ```sh
  npm run migration:run
  ```
- **Revert last migration:**
  ```sh
  npm run migration:revert
  ```

---

## 📡 API Health Check

Once the server is running, you can check the health of the service:

```sh
curl -f http://localhost:40000/api/v1/health
```

---

## 🎯 Best Practices Followed

✅ **Consistent Code Formatting** with Prettier\
✅ **Linting** with ESLint for better code quality\
✅ **Environment Variable Management** using `.env` files\
✅ **Database Migrations** using TypeORM\
✅ **Dockerized Application** for easy deployment\
✅ **Health Checks** for monitoring service uptime\
✅ **Testing Coverage** with Jest

---

## 📩 Contact

For questions or support, feel free to reach out!

---

### 🚀 Happy Coding!

