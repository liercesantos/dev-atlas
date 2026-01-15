import { SetMetadata } from '@nestjs/common';

export const CACHE_CONTROL_KEY = 'cache_control';
export const CacheControl = (value: string) => SetMetadata(CACHE_CONTROL_KEY, value);
