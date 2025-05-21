import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChapterDto {
  @ApiProperty({ description: 'Book ID' })
  @IsInt()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({ description: 'Chapter number' })
  @IsInt()
  @IsNotEmpty()
  chapter: number;

  @ApiProperty({ description: 'Volume number', required: false })
  @IsInt()
  @IsOptional()
  volume?: number;

  @ApiProperty({ description: 'Chapter name' })
  @IsString()
  @IsOptional()
  nama: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ description: 'Image content', required: false })
  @IsString()
  @IsOptional()
  isigambar?: string;

  @ApiProperty({ description: 'Text content', required: false })
  @IsString()
  @IsOptional()
  isitext?: string;
}