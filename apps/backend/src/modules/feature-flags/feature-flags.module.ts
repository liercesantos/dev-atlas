import { Module } from '@nestjs/common';
import { FeatureFlagsService } from '@/modules/feature-flags/application/feature-flags.service';
import { FeatureFlagsController } from '@/modules/feature-flags/infra/controllers/feature-flags.controller';

@Module({
  providers: [FeatureFlagsService],
  controllers: [FeatureFlagsController],
  exports: [FeatureFlagsService],
})
export class FeatureFlagsModule {}
