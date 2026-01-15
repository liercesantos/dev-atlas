import { Controller, Get } from '@nestjs/common';
import { Public } from '@/shared/decorators/public.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Roles('ADMIN')
  @Get('admin')
  adminCheck() {
    return {
      status: 'ok',
      message: 'Hello Admin',
    };
  }
}
