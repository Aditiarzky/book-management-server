import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../../genres/dto/genre-response.dto'; 
import { Chapter } from '../../chapters/dto/chapter-response.dto';

export class Book {
  @ApiProperty({ description: 'Book ID' })
  id: number;

  @ApiProperty({ description: 'Title of the book' })
  judul: string;

  @ApiProperty({ description: 'Alternative title of the book', required: false })
  alt_judul?: string;

  @ApiProperty({ description: 'Cover image URL' })
  cover: string;

  @ApiProperty({ description: 'Author name' })
  author: string;

  @ApiProperty({ description: 'Artist name' })
  artist: string;

  @ApiProperty({ description: 'Synopsis', required: false })
  synopsis?: string;

  @ApiProperty({ description: 'Status of the book', required: false })
  status?: string;

  @ApiProperty({ description: 'Type of the book', required: false })
  type?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Last updated timestamp' })
  updated_at: Date;

  @ApiProperty({ description: 'Genres associated with the book', type: [Genre] })
  genres: Genre[];

  @ApiProperty({ description: 'Chapters of the book', type: [Chapter] })
  chapters: Chapter[];
}