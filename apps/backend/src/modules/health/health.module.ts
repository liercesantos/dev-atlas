import { Module } from '@nestjs/common';
import { HealthController } from './infra/controllers/health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
