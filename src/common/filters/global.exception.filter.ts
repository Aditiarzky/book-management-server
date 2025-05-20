import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../dto/response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal server error';
    let errorResponse: any = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      message = exception.message || exceptionResponse.message || exceptionResponse.error;
      errorResponse = exceptionResponse;
    } else {
      console.error('Unhandled Error:', exception);
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
      ...(process.env.NODE_ENV === 'development' && { error: errorResponse }),
    });
  }
}