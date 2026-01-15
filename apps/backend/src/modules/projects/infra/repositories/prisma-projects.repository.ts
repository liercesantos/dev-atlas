/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
import { Project } from '../../domain/entities/project.entity';

@Injectable()
export class PrismaProjectsRepository implements IProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Promise<Project[]> {
    try {
      console.log('Fetching projects');
      const projects = await this.prisma.project.findMany(params);
      return projects.map((p) => this.mapToEntity(p));
    } catch {
      console.log('Error while fetching projects', params);
      return [];
    }
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    return project ? this.mapToEntity(project) : null;
  }

  async create(data: any): Promise<Project> {
    const project = await this.prisma.project.create({
      data,
    });
    return this.mapToEntity(project);
  }

  async update(id: string, data: any): Promise<Project> {
    const project = await this.prisma.project.update({
      where: { id },
      data,
    });
    return this.mapToEntity(project);
  }

  async delete(id: string): Promise<Project> {
    const project = await this.prisma.project.delete({
      where: { id },
    });
    return this.mapToEntity(project);
  }

  async count(where?: any): Promise<number> {
    try {
      console.log('Counting projects');
      return this.prisma.project.count({ where });
    } catch {
      console.log('Error while counting projects');
      return 0;
    }
  }

  private mapToEntity(project: any): Project {
    return new Project({
      id: project.id,
      title: project.title,
      description: project.description,
      content: project.content,
      imageUrl: project.imageUrl,
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      tags: project.tags,
      published: project.published,
      authorId: project.authorId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    });
  }
}
