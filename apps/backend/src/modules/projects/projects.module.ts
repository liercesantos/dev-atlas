import { Module } from '@nestjs/common';
import { ProjectsService } from './application/services/projects.service';
import { ProjectsController } from './infra/controllers/projects.controller';
import { PrismaProjectsRepository } from './infra/repositories/prisma-projects.repository';
import { ProjectsResolver } from './infra/resolvers/projects.resolver';

@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectsResolver,
    {
      provide: 'IProjectsRepository',
      useClass: PrismaProjectsRepository,
    },
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
