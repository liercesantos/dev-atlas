import axiosInstance from '@/lib/api/axios';
import {
  Project,
  PaginatedProjects,
  ProjectFilter,
  CreateProjectDto,
  UpdateProjectDto,
} from '../types';

export const projectsService = {
  async getAll(filter?: ProjectFilter): Promise<PaginatedProjects> {
    try {
      const response = await axiosInstance.get<PaginatedProjects>('/projects', {
        params: filter,
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching projects', error);
      return {
        items: [],
        total: 0,
        skip: 0,
        take: 0,
      };
    }
  },

  async getById(id: string): Promise<Project> {
    const response = await axiosInstance.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async create(data: CreateProjectDto): Promise<Project> {
    const response = await axiosInstance.post<Project>('/projects', data);
    return response.data;
  },

  async update(id: string, data: UpdateProjectDto): Promise<Project> {
    const response = await axiosInstance.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/projects/${id}`);
  },
};
