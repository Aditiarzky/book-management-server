import { Module } from '@nestjs/common';
import { GenresModule } from './modules/genres/genres.module';
import { BooksModule } from './modules/books/books.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [GenresModule, BooksModule, ChaptersModule],
  providers: [PrismaService],
})
export class AppModule {}