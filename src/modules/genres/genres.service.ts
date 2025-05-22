import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    console.log('Creating genre with data:', createGenreDto);
    return this.prisma.genre.create({
      data: {
        nama: createGenreDto.nama,
        deskripsi: createGenreDto.deskripsi || null,
      },
    });
  }

  async findAll() {
    return this.prisma.genre.findMany({ orderBy:{nama:'asc'},include: { books: true } });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({ where: { id }, include: { books: true } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.findOne(id);
    return this.prisma.genre.update({
      where: { id },
      data: {
        nama: updateGenreDto.nama,
        deskripsi: updateGenreDto.deskripsi,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.genre.delete({ where: { id } });
  }
}