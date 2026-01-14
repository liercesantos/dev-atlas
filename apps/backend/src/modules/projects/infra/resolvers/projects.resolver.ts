import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectsService } from '../../application/services/projects.service';
import { Project } from '../../domain/entities/project.entity';
import { CreateProjectDto } from '../../application/dto/create-project.dto';
import { UpdateProjectDto } from '../../application/dto/update-project.dto';
import { ProjectFilterDto } from '../../application/dto/project-filter.dto';
import { PaginatedProjects } from '../../application/dto/paginated-projects.dto';
import { Public } from '@/shared/decorators/public.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { GetUser } from '@/shared/decorators/get-user.decorator';
import { GqlAtGuard } from '../../infra/guards/gql-at.guard';
import { GqlRolesGuard } from '../../infra/guards/gql-roles.guard';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Query(() => PaginatedProjects, { name: 'projects' })
  findAll(@Args() filter: ProjectFilterDto) {
    return this.projectsService.findAll(filter);
  }

  @Public()
  @Query(() => Project, { name: 'project' })
  findOne(@Args('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Roles('ADMIN', 'EDITOR')
  @UseGuards(GqlAtGuard, GqlRolesGuard)
  @Mutation(() => Project)
  createProject(
    @GetUser('id') userId: string,
    @Args('createProjectInput') createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(userId, createProjectDto);
  }

  @Roles('ADMIN', 'EDITOR')
  @UseGuards(GqlAtGuard, GqlRolesGuard)
  @Mutation(() => Project)
  updateProject(
    @Args('id') id: string,
    @Args('updateProjectInput') updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Roles('ADMIN')
  @UseGuards(GqlAtGuard, GqlRolesGuard)
  @Mutation(() => Project)
  removeProject(@Args('id') id: string) {
    return this.projectsService.remove(id);
  }
}
