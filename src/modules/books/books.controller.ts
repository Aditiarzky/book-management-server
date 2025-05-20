import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of books', type: [Book] })
  findAll() {
    return this.booksService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search books by genre combination' })
  @ApiResponse({ status: 200, description: 'List of books matching genre combination', type: [Book] })
  async searchByGenre(@Query('genreIds') genreIds: string) {
    console.log('Received genreIds query:', genreIds);

    if (!genreIds) {
      throw new BadRequestException('Genre IDs are required');
    }

    const ids = genreIds.split(',').map((id) => {
      const parsedId = +id;
      console.log(`Converting ID "${id}" to ${parsedId}`);
      if (isNaN(parsedId) || parsedId <= 0) {
        throw new BadRequestException(`Invalid genre ID: ${id}`);
      }
      return parsedId;
    });

    console.log('Converted genreIds array:', ids);
    return this.booksService.findByGenreCombination(ids);
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