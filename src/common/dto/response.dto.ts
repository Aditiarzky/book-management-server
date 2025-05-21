import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Berhasil menambahkan chapter' })
  message: string;

  @ApiProperty({ nullable: true, required: false })
  data?: T | null;

  @ApiProperty({ required: false, description: 'Pagination metadata', example: { total: 25, page: 1, limit: 10, totalPages: 3 } })
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}