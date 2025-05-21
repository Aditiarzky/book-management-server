import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Chapter } from './dto/chapter-response.dto';

@ApiTags('chapters')
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chapter' })
  @ApiResponse({ status: 201, description: 'Chapter created', type: Chapter })
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chapters with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'List of chapters with pagination', type: [Chapter] })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedPage) || parsedPage < 1) {
      throw new BadRequestException('Page must be a positive integer');
    }
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      throw new BadRequestException('Limit must be a positive integer');
    }

    return this.chaptersService.findAll(parsedPage, parsedLimit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a chapter by ID' })
  @ApiResponse({ status: 200, description: 'Chapter details', type: Chapter })
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a chapter' })
  @ApiResponse({ status: 200, description: 'Chapter updated', type: Chapter })
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chapter' })
  @ApiResponse({ status: 200, description: 'Chapter deleted' })
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(+id);
  }
}