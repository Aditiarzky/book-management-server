import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Book } from './dto/book-response.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book created', type: Book })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Sort by created_at (asc or desc, default: desc)' })
  @ApiResponse({ status: 200, description: 'List of books with pagination', type: [Book] })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sortBy') sortBy: string = 'desc',
  ) {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedPage) || parsedPage < 1) {
      throw new BadRequestException('Page must be a positive integer');
    }
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      throw new BadRequestException('Limit must be a positive integer');
    }
    if (sortBy !== 'asc' && sortBy !== 'desc') {
      throw new BadRequestException('sortBy must be either "asc" or "desc"');
    }

    return this.booksService.findAll(parsedPage, parsedLimit, sortBy as 'asc' | 'desc');
  }

  @Get('search')
  @ApiOperation({ summary: 'Search books by genre combination' })
  @ApiQuery({ name: 'genreIds', required: true, type: String, description: 'Comma-separated list of genre IDs' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Sort by created_at (asc or desc, default: desc)' })
  @ApiResponse({ status: 200, description: 'List of books matching genre combination', type: [Book] })
  async searchByGenre(@Query('genreIds') genreIds: string, @Query('sortBy') sortBy: string = 'desc') {
    if (!genreIds) {
      throw new BadRequestException('Genre IDs are required');
    }

    const ids = genreIds.split(',').map((id) => {
      const parsedId = +id;
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new BadRequestException(`Invalid genre ID: ${id}`);
      }
      return parsedId;
    });

    if (sortBy !== 'asc' && sortBy !== 'desc') {
      throw new BadRequestException('sortBy must be either "asc" or "desc"');
    }

    return this.booksService.findByGenreCombination(ids, sortBy as 'asc' | 'desc');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({ status: 200, description: 'Book details', type: Book })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({ status: 200, description: 'Book updated', type: Book })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({ status: 200, description: 'Book deleted' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}