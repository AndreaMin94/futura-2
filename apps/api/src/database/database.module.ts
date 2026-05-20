import { Module } from '@nestjs/common';
import { PrismaService } from './primsa.service.js';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
