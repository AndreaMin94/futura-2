import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import 'reflect-metadata';

import { AppModule } from './app.module.js';
import { getAppConfig } from './app.config.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const { apiPort } = getAppConfig();

  await app.listen({
    port: apiPort,
    host: '0.0.0.0',
  });
}

void bootstrap();
