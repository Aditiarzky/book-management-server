import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const genres = await this.prisma.genre.findMany({
      where: { id: { in: createBookDto.genreIds } },
    });
    if (genres.length !== createBookDto.genreIds.length) {
      throw new NotFoundException('One or more genres not found');
    }

    return this.prisma.book.create({
      data: {
        judul: createBookDto.judul,
        alt_judul: createBookDto.alt_judul,
        cover: createBookDto.cover,
        author: createBookDto.author,
        artist: createBookDto.artist,
        synopsis: createBookDto.synopsis,
        status: createBookDto.status,
        type: createBookDto.type,
        genres: {
          connect: createBookDto.genreIds.map((id) => ({ id })),
        },
      },
      include: { genres: true, chapters: true },
    });
  }

  async findAll() {
    return this.prisma.book.findMany({ include: { genres: true, chapters: true } });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genres: true, chapters: true },
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    if (updateBookDto.genreIds) {
      const genres = await this.prisma.genre.findMany({
        where: { id: { in: updateBookDto.genreIds } },
      });
      if (genres.length !== updateBookDto.genreIds.length) {
        throw new NotFoundException('One or more genres not found');
      }
    }

    return this.prisma.book.update({
      where: { id },
      data: {
        judul: updateBookDto.judul,
        alt_judul: updateBookDto.alt_judul,
        cover: updateBookDto.cover,
        author: updateBookDto.author,
        artist: updateBookDto.artist,
        synopsis: updateBookDto.synopsis,
        status: updateBookDto.status,
        type: updateBookDto.type,
        genres: updateBookDto.genreIds
          ? { set: updateBookDto.genreIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { genres: true, chapters: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }

  // Pencarian berdasarkan kombinasi genre
  async findByGenreCombination(genreIds: number[]) {
    return this.prisma.book.findMany({
      where: {
        genres: {
          every: {
            id: { in: genreIds },
          },
        },
      },
      include: { genres: true, chapters: true },
    });
  }
}