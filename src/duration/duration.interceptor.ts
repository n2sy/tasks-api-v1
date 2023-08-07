import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('In interceptor');
    console.log(context);

    const dateIn = Date.now();

    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log(`Duration : ${dateOut - dateIn} ms`);
      }),
    );
  }
}
