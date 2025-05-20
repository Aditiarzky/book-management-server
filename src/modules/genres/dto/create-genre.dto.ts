import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ description: 'Genre name' })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({ description: 'Genre description', required: false })
  @IsString()
  @IsOptional()
  deskripsi?: string;
}