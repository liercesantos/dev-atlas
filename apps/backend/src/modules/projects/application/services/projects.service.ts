import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectFilterDto } from '../dto/project-filter.dto';
import { PaginatedProjects } from '../dto/paginated-projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('IProjectsRepository')
    private readonly projectsRepository: IProjectsRepository,
  ) {}

  async findAll(filter: ProjectFilterDto): Promise<PaginatedProjects> {
    const { skip = 0, take = 10, search, tag, published } = filter;

    const where: any = {};

    if (published !== undefined) {
      where.published = published;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.projectsRepository.findAll({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.projectsRepository.count(where),
    ]);

    return {
      items,
      total,
      skip,
      take,
    };
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async create(authorId: string, dto: CreateProjectDto) {
    return this.projectsRepository.create({
      ...dto,
      authorId,
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.projectsRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.projectsRepository.delete(id);
  }
}
