import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CACHE_CONTROL_KEY } from '../decorators/cache-control.decorator';
import { Response } from 'express';

@Injectable()
export class CacheControlInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const cacheControlValue = this.reflector.get<string>(
      CACHE_CONTROL_KEY,
      context.getHandler(),
    );

    if (cacheControlValue) {
      const response = context.switchToHttp().getResponse<Response>();
      response.setHeader('Cache-Control', cacheControlValue);
    }

    return next.handle();
  }
}
