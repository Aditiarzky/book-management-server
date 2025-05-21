import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        // Tentukan pesan berdasarkan metode HTTP
        let message = 'Request successfully processed';
        if (request.method === 'POST') {
          message = 'Data successfully added';
        } else if (request.method === 'PUT' || request.method === 'PATCH') {
          message = 'Data successfully edited';
        } else if (request.method === 'GET') {
          message = 'Data retrieved successfully';
        }

        // Periksa apakah result memiliki struktur pagination (data dan meta)
        if (result && typeof result === 'object' && 'data' in result && 'meta' in result) {
          return {
            success: true,
            message,
            data: result.data,
            meta: result.meta,
          };
        }

        // Untuk respons biasa, gunakan struktur default
        const response: ResponseDto = {
          success: true,
          message,
          data: result,
        };

        return response;
      }),
    );
  }
}