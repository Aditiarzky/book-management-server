import { Module } from '@nestjs/common';
import { GenresModule } from './modules/genres/genres.module';
import { BooksModule } from './modules/books/books.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [GenresModule, BooksModule, ChaptersModule, UsersModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}