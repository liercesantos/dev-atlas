import axiosInstance from '@/lib/api/axios';
import { AxiosInstance } from 'axios';
import {
  Project,
  PaginatedProjects,
  ProjectFilter,
  CreateProjectDto,
  UpdateProjectDto,
} from '../types';

export const projectsService = {
  async getAll(filter?: ProjectFilter, api: AxiosInstance = axiosInstance): Promise<PaginatedProjects> {
    try {
      const response = await api.get<PaginatedProjects>('/projects', {
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

  async getById(id: string, api: AxiosInstance = axiosInstance): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async create(data: CreateProjectDto, api: AxiosInstance = axiosInstance): Promise<Project> {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  },

  async update(id: string, data: UpdateProjectDto, api: AxiosInstance = axiosInstance): Promise<Project> {
    const response = await api.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  async delete(id: string, api: AxiosInstance = axiosInstance): Promise<void> {
    await api.delete(`/projects/${id}`);
  },
};
