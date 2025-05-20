import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Berhasil menambahkan chapter' })
  message: string;

  @ApiProperty({ nullable: true, required: false })
  data?: T | null;
}