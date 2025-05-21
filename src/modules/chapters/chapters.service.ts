import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(private prisma: PrismaService) {}

  async create(createChapterDto: CreateChapterDto) {
    const book = await this.prisma.book.findUnique({ where: { id: createChapterDto.bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${createChapterDto.bookId} not found`);
    }

    return this.prisma.chapter.create({
      data: {
        book: { connect: { id: createChapterDto.bookId } },
        chapter: createChapterDto.chapter,
        volume: createChapterDto.volume,
        nama: createChapterDto.nama,
        thumbnail: createChapterDto.thumbnail,
        isigambar: createChapterDto.isigambar,
        isitext: createChapterDto.isitext,
      },
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit; 

    const chapters = await this.prisma.chapter.findMany({
      skip,
      take: limit,
      include: { book: true },
    });

    const total = await this.prisma.chapter.count();

    return {
      data: chapters,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number) {
    const chapter = await this.prisma.chapter.findFirst({
      where: {
        id,
      },
      include: { book: true },
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }
    return chapter;
  }

  async findOne(id: number, bookId: number) {
    const chapter = await this.prisma.chapter.findFirst({
      where: {
        id,
        bookId, 
      },
      include: { book: true },
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} and Book ID ${bookId} not found`);
    }
    return chapter;
  }

  async findByBook(bookId: number) {
    const chapter = await this.prisma.chapter.findMany({
      where: {
        bookId, 
      },
      include: { book: true },
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with Book ID ${bookId} not found`);
    }
    return chapter;
  }

  async update(id: number, updateChapterDto: UpdateChapterDto) {
    const chapter = await this.findOne(id, updateChapterDto.bookId ?? 0); 
    if (updateChapterDto.bookId) {
      const book = await this.prisma.book.findUnique({ where: { id: updateChapterDto.bookId } });
      if (!book) {
        throw new NotFoundException(`Book with ID ${updateChapterDto.bookId} not found`);
      }
    }

    return this.prisma.chapter.update({
      where: { id },
      data: {
        book: updateChapterDto.bookId ? { connect: { id: updateChapterDto.bookId } } : undefined,
        chapter: updateChapterDto.chapter,
        volume: updateChapterDto.volume,
        nama: updateChapterDto.nama,
        thumbnail: updateChapterDto.thumbnail,
        isigambar: updateChapterDto.isigambar,
        isitext: updateChapterDto.isitext,
      },
      include: { book: true },
    });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.chapter.delete({ where: { id } });
  }
}