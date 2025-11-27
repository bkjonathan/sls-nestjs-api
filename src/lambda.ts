import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Context, Handler } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';
import express from 'express';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    // Enable global validation
    nestApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Enable CORS if needed
    nestApp.enableCors();

    // Set global prefix for all routes
    nestApp.setGlobalPrefix('api');

    await nestApp.init();

    cachedServer = awsServerlessExpress.createServer(expressApp);
  }

  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  const server = await bootstrapServer();
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
