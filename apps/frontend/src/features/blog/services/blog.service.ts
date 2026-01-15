import axiosInstance from '@/lib/api/axios';
import { AxiosInstance } from 'axios';
import {
  BlogPost,
  PaginatedBlogPosts,
  BlogPostFilter,
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from '../types';

export const blogService = {
  async getAll(filter?: BlogPostFilter, api: AxiosInstance = axiosInstance): Promise<PaginatedBlogPosts> {
    const response = await api.get<PaginatedBlogPosts>('/blog', {
      params: filter,
    });
    return response.data;
  },

  async getById(id: string, api: AxiosInstance = axiosInstance): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/blog/${id}`);
    return response.data;
  },

  async getBySlug(slug: string, api: AxiosInstance = axiosInstance): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/blog/slug/${slug}`);
    return response.data;
  },

  async create(data: CreateBlogPostDto, api: AxiosInstance = axiosInstance): Promise<BlogPost> {
    const response = await api.post<BlogPost>('/blog', data);
    return response.data;
  },

  async update(id: string, data: UpdateBlogPostDto, api: AxiosInstance = axiosInstance): Promise<BlogPost> {
    const response = await api.patch<BlogPost>(`/blog/${id}`, data);
    return response.data;
  },

  async delete(id: string, api: AxiosInstance = axiosInstance): Promise<void> {
    await api.delete(`/blog/${id}`);
  },
};
