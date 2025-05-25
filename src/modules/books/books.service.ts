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
      include: {genres: {
        select:{
          id:true,
          nama:true,
        }
      }, 
      chapters:{
        select:{
          id:true,
          chapter:true,
          volume:true,
          nama:true,
          bookId:true,
          created_at:true,
          thumbnail:true,
        }
      }},
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
      include: {genres: {
        select:{
          id:true,
          nama:true,
        }
      }, 
      chapters:{
        select:{
          id:true,
          chapter:true,
          volume:true,
          nama:true,
          bookId:true,
          created_at:true,
          thumbnail:true,
        }
      }},
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
      include: { genres: {
        select:{
          id:true,
          nama:true,
        }
      }, 
      chapters:{
        select:{
          id:true,
          chapter:true,
          volume:true,
          nama:true,
          bookId:true,
          created_at:true,
          thumbnail:true,
        }
      }},
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
      include: { genres: {
        select:{
          id:true,
          nama:true,
        }
      }, 
      chapters:{
        select:{
          id:true,
          chapter:true,
          volume:true,
          nama:true,
          bookId:true,
          created_at:true,
          thumbnail:true,
        }
      }},
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }

async findBySearchCombination(
  genreIds?: number[],
  search?: string,
  creator?: string,
  sortBy: 'asc' | 'desc' = 'desc',
  page: number = 1,
  limit: number = 10
) {
  const noFilter =
    (!genreIds || genreIds.length === 0) &&
    (!search || search.trim() === '') &&
    (!creator || creator.trim() === '');

  if (noFilter) {
    return this.findAll(page, limit, sortBy);
  }

  const filters: any = {};

  if (search) {
    filters.OR = [
      { judul: { contains: search, mode: 'insensitive' } },
      { alt_judul: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (creator) {
    filters.OR = [
      ...(filters.OR || []),
      { author: { contains: creator, mode: 'insensitive' } },
      { artist: { contains: creator, mode: 'insensitive' } },
    ];
  }

  if (genreIds && genreIds.length > 0) {
    filters.genres = {
      some: {
        id: { in: genreIds },
      },
    };
  }

  const skip = (page - 1) * limit;

  const books = await this.prisma.book.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: {
      created_at: sortBy,
    },
    include: { 
      genres: {
        select:{
          id:true,
          nama:true,
        }
      }, 
      chapters:{
        select:{
          id:true,
          chapter:true,
          volume:true,
          nama:true,
          bookId:true,
          created_at:true,
          thumbnail:true,
        }
      }},
  });

  const total = await this.prisma.book.count({ where: filters });

  const finalBooks =
    genreIds && genreIds.length > 0
      ? books.filter((book) => {
          const bookGenreIds = book.genres.map((genre) => genre.id);
          return genreIds.every((id) => bookGenreIds.includes(id));
        })
      : books;

  return {
    data: finalBooks,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
}