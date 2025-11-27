# NestJS Serverless API

A serverless backend API built with NestJS and AWS Lambda, using the Serverless Framework.

## Features

- NestJS framework for building efficient, scalable applications
- AWS Lambda for serverless deployment
- API Gateway for HTTP endpoints
- TypeScript for type safety
- Serverless Offline for local development
- **Sequelize ORM with MySQL database**
- **Docker Compose for local MySQL setup**
- Database migrations with Sequelize CLI
- Example CRUD API for Users

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- AWS CLI configured with credentials
- Serverless Framework
- **Docker and Docker Compose (for local database)**

## Installation

```bash
npm install
```

## Database Setup

### 1. Start MySQL with Docker Compose

```bash
# Start MySQL container
docker-compose up -d

# Check if MySQL is running
docker-compose ps
```

The MySQL database will be available at:
- Host: `localhost`
- Port: `3306`
- Database: `nestjs_db`
- Username: `nestjs_user`
- Password: `nestjs_password`

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

The default configuration works with the Docker Compose setup.

### 3. Run Database Migrations

```bash
# Run all pending migrations
npm run migration:run

# Check migration status
npm run migration:status

# Revert last migration (if needed)
npm run migration:revert
```

### Database Management Commands

```bash
# Stop MySQL container
docker-compose stop

# Start MySQL container
docker-compose start

# Stop and remove containers
docker-compose down

# Stop and remove containers with volumes (WARNING: deletes all data)
docker-compose down -v
```

## Local Development

Run the application locally:

```bash
# Start in development mode
npm run start:dev

# Or use serverless offline to simulate AWS Lambda locally
# Note: Build is required before running offline
npm run build
npm run offline
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API health status
- `GET /api` - Welcome message

### Users (CRUD)
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Example Request

Create a user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## Deployment

Deploy to AWS:

```bash
# Deploy to dev environment
npm run deploy:dev

# Deploy to prod environment
npm run deploy:prod

# Or deploy to default stage
npm run deploy
```

## Remove Deployment

```bash
npm run remove
```

## View Logs

```bash
npm run logs
```

## Project Structure

```
src/
├── app.module.ts         # Root module
├── app.controller.ts     # Root controller with health check
├── app.service.ts        # Root service
├── main.ts               # Application entry point (for local dev)
├── lambda.ts             # Lambda handler (for AWS deployment)
├── database/             # Database configuration
│   ├── database.module.ts
│   ├── database.config.ts
│   ├── config/
│   │   └── config.js     # Sequelize CLI configuration
│   ├── migrations/       # Database migrations
│   │   └── 20251127000001-create-users-table.js
│   └── seeders/          # Database seeders
└── users/                # Users module
    ├── users.module.ts
    ├── users.controller.ts
    ├── users.service.ts
    ├── dto/              # Data Transfer Objects
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    └── entities/         # Sequelize models
        └── user.entity.ts
```

## Configuration

- `serverless.yml` - Serverless Framework configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts
- `.sequelizerc` - Sequelize CLI configuration
- `docker-compose.yml` - Docker Compose configuration for MySQL
- `.env` - Environment variables (local)

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=nestjs_user
DB_PASSWORD=nestjs_password
DB_DATABASE=nestjs_db

# Application
NODE_ENV=development
PORT=3000
```

## Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Serverless Framework](https://www.serverless.com/) - Serverless deployment
- [AWS Lambda](https://aws.amazon.com/lambda/) - Serverless compute
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Sequelize](https://sequelize.org/) - ORM for Node.js
- [MySQL](https://www.mysql.com/) - Relational database
- [Docker](https://www.docker.com/) - Containerization platform
