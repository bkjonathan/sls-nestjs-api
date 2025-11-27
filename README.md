# NestJS Serverless API

A serverless backend API built with NestJS and AWS Lambda, using the Serverless Framework.

## Features

- NestJS framework for building efficient, scalable applications
- AWS Lambda for serverless deployment
- API Gateway for HTTP endpoints
- TypeScript for type safety
- Serverless Offline for local development
- Example CRUD API for Users

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- AWS CLI configured with credentials
- Serverless Framework

## Installation

```bash
npm install
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
└── users/                # Users module
    ├── users.module.ts
    ├── users.controller.ts
    ├── users.service.ts
    ├── dto/              # Data Transfer Objects
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    └── entities/         # Entity definitions
        └── user.entity.ts
```

## Configuration

- `serverless.yml` - Serverless Framework configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## Environment Variables

Set environment-specific variables in `serverless.yml` under `provider.environment`.

## Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Serverless Framework](https://www.serverless.com/) - Serverless deployment
- [AWS Lambda](https://aws.amazon.com/lambda/) - Serverless compute
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
