# devotell-dtai: job-provider normalization

## 📌 Project Overview

A NestJS integration service that brings two external job-provider payloads into a shared job, company, location, and skills model, then persists the result in PostgreSQL through TypeORM. The public job-offers endpoint exposes the normalized records with filtering and pagination.

## What to inspect

- `src/api/normalization/service/normalization.service.ts`: the two provider mappings.
- `src/api/job-sync/service/job-sync.service.ts`: per-job transaction boundaries and coordinated upserts.
- `src/api/job/controller/job.controller.ts`: the job-offers read interface.
- `src/database/entities` and `src/database/migrations`: persistence model and schema evolution.
- `src/api/normalization/service/normalization.test.spec.ts`: normalization examples expressed as tests.

```text
Provider payload -> normalizer -> job/company/location/skill DTOs
                 -> per-job transaction -> PostgreSQL -> job-offers API
```

## Scope and limitations

This is an integration project, not a claim of large-scale production operation. Running it requires a local PostgreSQL instance, provider configuration, and appropriate permission to use the external APIs. Scheduled synchronization can make outbound requests; use a local fixture provider when exploring. The current source processes provider batches concurrently; bounded concurrency and operational load characterization would be follow-up work. Repository visibility does not imply a permissive license: package metadata currently declares UNLICENSED.

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
git clone https://github.com/saeedghofrani/devotell-dtai.git
cd devotell-dtai
```

### Step 2: Install dependencies

```sh
npm install
```

### Step 3: Set up environment variables

Copy `.env.example` to a local `.env` and `.env.development`, then configure the application, provider URLs, PostgreSQL connection, and both cron schedules. The development script selects `.env.development`. Keep real credentials out of Git. The following is a partial example; use the example file for all required keys:

```env
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_database_name
APP_PORT=40000
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
      test: ['CMD', 'curl', '-f', 'http://localhost:40000/api/v1']
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
curl -f http://localhost:40000/api/v1
```

---

## 🎯 Best Practices Followed

✅ **Consistent Code Formatting** with Prettier\
✅ **Linting** with ESLint for better code quality\
✅ **Environment Variable Management** using `.env` files\
✅ **Database Migrations** using TypeORM\
✅ **Dockerized Application** for easy deployment\
✅ **Health endpoint** for checking application availability\
✅ **Test scripts** using Jest

---

## 📩 Contact

For questions or support, feel free to reach out!

---

### 🚀 Happy Coding!
