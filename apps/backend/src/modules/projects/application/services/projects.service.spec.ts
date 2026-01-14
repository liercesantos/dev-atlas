import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { NotFoundException } from '@nestjs/common';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: any;

  const mockRepository = {
    findAll: jest.fn(),
    count: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: 'IProjectsRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get('IProjectsRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated projects', async () => {
      const filter = { skip: 0, take: 10 };
      const items = [{ id: '1', title: 'Project 1' }];
      const total = 1;

      repository.findAll.mockResolvedValue(items);
      repository.count.mockResolvedValue(total);

      const result = await service.findAll(filter);

      expect(result).toEqual({
        items,
        total,
        skip: 0,
        take: 10,
      });
      expect(repository.findAll).toHaveBeenCalledWith(expect.objectContaining({ skip: 0, take: 10 }));
    });
  });

  describe('findOne', () => {
    it('should return a project if found', async () => {
      const project = { id: '1', title: 'Project 1' };
      repository.findById.mockResolvedValue(project);

      const result = await service.findOne('1');

      expect(result).toEqual(project);
    });

    it('should throw NotFoundException if project not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });
});
