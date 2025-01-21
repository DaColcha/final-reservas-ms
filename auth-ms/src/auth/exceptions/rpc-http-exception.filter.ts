import { Catch, RpcExceptionFilter, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class RpcHttpExceptionFilter
  implements RpcExceptionFilter<HttpException>
{
  catch(exception: HttpException): Observable<any> {
    const response = {
      statusCode: exception.getStatus(),
      message: exception.getResponse(),
    };
    return throwError(() => response);
  }
}
