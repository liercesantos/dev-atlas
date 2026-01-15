import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureFlagsService {
  private readonly flags = {
    ENABLE_BLOG: true,
    ENABLE_PROJECTS: true,
    ENABLE_ANALYTICS: false,
    ENABLE_CHAT: false,
  };

  constructor(private readonly configService: ConfigService) {}

  getAllFlags() {
    return {
      ...this.flags,
      // You can also override with env vars if needed
      ENABLE_BLOG: this.configService.get<boolean>('ENABLE_BLOG', this.flags.ENABLE_BLOG),
      ENABLE_PROJECTS: this.configService.get<boolean>('ENABLE_PROJECTS', this.flags.ENABLE_PROJECTS),
      ENABLE_ANALYTICS: this.configService.get<boolean>('ENABLE_ANALYTICS', this.flags.ENABLE_ANALYTICS),
      ENABLE_CHAT: this.configService.get<boolean>('ENABLE_CHAT', this.flags.ENABLE_CHAT),
    };
  }

  isFeatureEnabled(flagName: keyof typeof this.flags): boolean {
    const allFlags = this.getAllFlags();
    return allFlags[flagName] ?? false;
  }
}
