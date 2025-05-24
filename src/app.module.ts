import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from 'prisma/prisma.service';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';
import { GenresModule } from './modules/genres/genres.module';
import { BooksModule } from './modules/books/books.module';
import { ChaptersModule } from './modules/chapters/chapters.module';

@Module({
  imports: [
    GenresModule, 
    BooksModule, 
    ChaptersModule,
    AuthModule,
    UsersModule,
    RateLimiterModule.register({
      points: 10, 
      duration: 60, 
      errorMessage: 'Too many requests, please try again later',
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}