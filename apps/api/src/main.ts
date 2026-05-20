import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import 'reflect-metadata';

import { AppModule } from './app.module.js';

const defaultPort = 3000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const port = Number(process.env.API_PORT ?? defaultPort);

  await app.listen({
    port,
    host: '0.0.0.0',
  });
}

void bootstrap();
