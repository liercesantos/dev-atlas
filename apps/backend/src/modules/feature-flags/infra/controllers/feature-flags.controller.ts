import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeatureFlagsService } from '@/modules/feature-flags/application/feature-flags.service';
import { Public } from '@/shared/decorators/public.decorator';

@ApiTags('FeatureFlags')
@Controller('feature-flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all feature flags' })
  getAllFlags() {
    return this.featureFlagsService.getAllFlags();
  }
}
