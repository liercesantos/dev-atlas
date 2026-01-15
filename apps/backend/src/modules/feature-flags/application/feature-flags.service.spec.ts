import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { FeatureFlagsService } from './feature-flags.service';

describe('FeatureFlagsService', () => {
  let service: FeatureFlagsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureFlagsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FeatureFlagsService>(FeatureFlagsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all flags', () => {
    jest.spyOn(configService, 'get').mockReturnValue(true);
    const flags = service.getAllFlags();
    expect(flags.ENABLE_BLOG).toBe(true);
  });

  it('should check if a feature is enabled', () => {
    jest.spyOn(configService, 'get').mockReturnValue(true);
    expect(service.isFeatureEnabled('ENABLE_BLOG')).toBe(true);
  });
});
