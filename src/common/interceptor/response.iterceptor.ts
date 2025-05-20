import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: ResponseDto = {
          success: true,
          message: 'Request successfully processed',
          data,
        };

        // Sesuaikan pesan jika diperlukan berdasarkan URL atau context
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        if (request.method === 'POST') {
          response.message = 'Data successfully added';
        } else if (request.method === 'PUT' || request.method === 'PATCH') {
          response.message = 'Data successfully edited';
        } else if (request.method === 'GET') {
          response.message = 'Data retrieved successfully';
        }

        return response;
      }),
    );
  }
}