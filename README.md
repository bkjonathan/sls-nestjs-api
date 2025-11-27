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

This project uses **MySQL** as the database and **Sequelize** as the ORM. For local development, we use Docker Compose to run MySQL in a container.

### Quick Start (Complete Setup)

```bash
# 1. Start MySQL database
docker-compose up -d

# 2. Wait for MySQL to be ready (check health status)
docker-compose ps

# 3. Run database migrations
npm run migration:run

# 4. Start the application
npm run start:dev
```

### Step-by-Step Setup

#### 1. Start MySQL with Docker Compose

Start the MySQL container in detached mode:

```bash
docker-compose up -d
```

**What this does:**
- Downloads MySQL 8.0 Docker image (if not already present)
- Creates a MySQL container named `sls-nestjs-mysql`
- Creates a custom network `nestjs-network`
- Creates persistent volumes for database data and configuration
- Starts MySQL on port `3306`

**Verify MySQL is running:**

```bash
# Check container status
docker-compose ps

# View MySQL logs
docker-compose logs mysql

# Check if MySQL is healthy
docker-compose ps mysql
```

You should see the container status as `Up` and health status as `healthy`.

**MySQL Connection Details:**
- **Host:** `localhost`
- **Port:** `3306`
- **Database:** `nestjs_db`
- **Username:** `nestjs_user`
- **Password:** `nestjs_password`
- **Root Password:** `rootpassword`

#### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

The `.env` file contains database credentials and application settings. The default values work with the Docker Compose setup, but you can modify them if needed.

**Environment Variables:**
```env
DB_HOST=localhost          # Database host
DB_PORT=3306              # Database port
DB_USERNAME=nestjs_user   # Database user
DB_PASSWORD=nestjs_password  # Database password
DB_DATABASE=nestjs_db     # Database name
NODE_ENV=development      # Environment
PORT=3000                 # Application port
```

#### 3. Run Database Migrations

Migrations are scripts that create and modify database tables. Run migrations to set up the database schema:

```bash
# Run all pending migrations
npm run migration:run
```

**What this does:**
- Connects to the MySQL database
- Creates a `SequelizeMeta` table to track migrations
- Runs all migration files in `src/database/migrations/`
- Creates the `users` table with all required columns

**Check migration status:**

```bash
# See which migrations have been executed
npm run migration:status
```

**Revert migrations (if needed):**

```bash
# Undo the last migration
npm run migration:revert
```

### Docker Compose Management

#### Starting and Stopping

```bash
# Start MySQL container (if stopped)
docker-compose start

# Stop MySQL container (keeps data)
docker-compose stop

# Restart MySQL container
docker-compose restart

# View running containers
docker-compose ps
```

#### Viewing Logs

```bash
# View all logs
docker-compose logs

# View MySQL logs
docker-compose logs mysql

# Follow logs in real-time
docker-compose logs -f mysql
```

#### Complete Cleanup

```bash
# Stop and remove containers (keeps volumes/data)
docker-compose down

# Stop and remove containers AND volumes (⚠️ DELETES ALL DATA!)
docker-compose down -v
```

⚠️ **Warning:** `docker-compose down -v` will permanently delete all data in the database!

#### Accessing MySQL Console

```bash
# Connect to MySQL shell
docker-compose exec mysql mysql -u nestjs_user -p

# Enter password: nestjs_password

# Or connect as root
docker-compose exec mysql mysql -u root -p

# Enter password: rootpassword
```

### Creating New Migrations

When you add new features that require database changes, create a new migration:

```bash
# Generate a new migration file
npm run migration:generate -- add-user-role

# This creates: src/database/migrations/TIMESTAMP-add-user-role.js
```

**Edit the generated migration file:**

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add your schema changes here
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'user',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes here
    await queryInterface.removeColumn('users', 'role');
  },
};
```

**Run the new migration:**

```bash
npm run migration:run
```

### Troubleshooting

#### MySQL container won't start

```bash
# Check if port 3306 is already in use
lsof -i :3306

# View detailed logs
docker-compose logs mysql

# Remove and recreate containers
docker-compose down
docker-compose up -d
```

#### Migration fails with "Access denied"

Check your `.env` file and ensure the credentials match the `docker-compose.yml` configuration.

#### Cannot connect to database

```bash
# Verify MySQL is running and healthy
docker-compose ps

# Check MySQL logs for errors
docker-compose logs mysql

# Test connection
docker-compose exec mysql mysql -u nestjs_user -p -e "SHOW DATABASES;"
```

#### Reset database completely

```bash
# Stop containers and remove all data
docker-compose down -v

# Start fresh
docker-compose up -d

# Wait for MySQL to be ready, then run migrations
npm run migration:run
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

## Quick Reference

### Common Commands

```bash
# Development
npm run start:dev              # Start development server with hot reload
npm run build                  # Build the project
npm run start:prod             # Run production build

# Docker & Database
docker-compose up -d           # Start MySQL database
docker-compose down            # Stop and remove containers
docker-compose logs -f mysql   # View MySQL logs
docker-compose ps              # Check container status

# Migrations
npm run migration:run          # Run pending migrations
npm run migration:status       # Check migration status
npm run migration:revert       # Undo last migration
npm run migration:generate -- migration-name  # Create new migration

# Serverless
npm run offline                # Run serverless offline (after build)
npm run deploy:dev             # Deploy to dev environment
npm run deploy:prod            # Deploy to prod environment
npm run logs                   # View Lambda logs

# Useful Docker Commands
docker-compose exec mysql mysql -u nestjs_user -p  # Access MySQL console
docker-compose restart mysql                        # Restart MySQL
docker-compose down -v                              # Remove all data (⚠️)
```

### Development Workflow

1. **First Time Setup:**
   ```bash
   npm install
   docker-compose up -d
   npm run migration:run
   npm run start:dev
   ```

2. **Daily Development:**
   ```bash
   docker-compose start        # Start MySQL (if stopped)
   npm run start:dev          # Start development server
   ```

3. **Adding New Features:**
   ```bash
   # Create migration if database changes needed
   npm run migration:generate -- add-new-feature

   # Edit migration file in src/database/migrations/

   # Run migration
   npm run migration:run

   # Start development
   npm run start:dev
   ```

4. **Deploy to AWS:**
   ```bash
   npm run build              # Build project
   npm run deploy:dev         # Deploy to development
   ```
