import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsArray, IsOptional } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Array of Genre IDs' })
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  genreIds: number[];

  @ApiProperty({ description: 'Title of the book' })
  @IsString()
  @IsNotEmpty()
  judul: string;

  @ApiProperty({ description: 'Alternative title of the book', required: false })
  @IsString()
  @IsOptional()
  alt_judul?: string;

  @ApiProperty({ description: 'Cover image URL' })
  @IsString()
  @IsNotEmpty()
  cover: string;

  @ApiProperty({ description: 'Author name' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'Artist name' })
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty({ description: 'Synopsis', required: false })
  @IsString()
  @IsOptional()
  synopsis?: string;

  @ApiProperty({ description: 'Status of the book', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Type of the book', required: false })
  @IsString()
  @IsOptional()
  type?: string;
}