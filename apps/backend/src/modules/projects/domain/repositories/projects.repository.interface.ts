import { Project } from '../entities/project.entity';

export interface IProjectsRepository {
  findAll(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  create(data: Partial<Project>): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<Project>;
  count(where?: any): Promise<number>;
}
