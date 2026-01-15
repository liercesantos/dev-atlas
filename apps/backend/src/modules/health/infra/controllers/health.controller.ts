import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '@/shared/decorators/public.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Check API health status' })
  @ApiResponse({ status: 200, description: 'API is healthy' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Get('admin')
  @ApiOperation({ summary: 'Check API health status for admins' })
  @ApiResponse({ status: 200, description: 'API is healthy for admin' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  adminCheck() {
    return {
      status: 'ok',
      message: 'Hello Admin',
    };
  }
}
