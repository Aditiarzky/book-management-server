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

  async findAll(page: number, limit: number, sortBy: 'asc' | 'desc' = 'desc') {
    const skip = (page - 1) * limit;

    const books = await this.prisma.book.findMany({
      skip,
      take: limit,
      orderBy: {
        created_at: sortBy,
      },
      include: { genres: true, chapters: true },
    });

    const total = await this.prisma.book.count();

    return {
      data: books,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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

  async findByGenreCombination(genreIds: number[], sortBy: 'asc' | 'desc' = 'desc') {
    const books = await this.prisma.book.findMany({
      where: {
        genres: {
          some: {
            id: { in: genreIds },
          },
        },
      },
      orderBy: {
        created_at: sortBy,
      },
      include: { genres: true, chapters: true },
    });

    return books.filter((book) => {
      const bookGenreIds = book.genres.map((genre) => genre.id);
      return genreIds.every((id) => bookGenreIds.includes(id));
    });
  }
}