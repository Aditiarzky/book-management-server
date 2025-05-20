import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService, PrismaService],
})
export class ChaptersModule {}