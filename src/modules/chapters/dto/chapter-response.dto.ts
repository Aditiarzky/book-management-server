import { ApiProperty } from '@nestjs/swagger';

export class Chapter {
  @ApiProperty({ description: 'Chapter ID' })
  id: number;

  @ApiProperty({ description: 'Book ID' })
  bookId: number;

  @ApiProperty({ description: 'Chapter number' })
  chapter: number;

  @ApiProperty({ description: 'Volume number', required: false })
  volume?: number;

  @ApiProperty({ description: 'Chapter name' })
  nama: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  thumbnail?: string;

  @ApiProperty({ description: 'Image content', required: false })
  isigambar?: string;

  @ApiProperty({ description: 'Text content', required: false })
  istext?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Last updated timestamp' })
  updated_at: Date;
}