import { ApiProperty } from '@nestjs/swagger';

export class Genre {
  @ApiProperty({ description: 'Genre ID' })
  id: number;

  @ApiProperty({ description: 'Genre name' })
  nama: string;

  @ApiProperty({ description: 'Genre description', required: false })
  deskripsi?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Last updated timestamp' })
  updated_at: Date;
}