import axiosInstance from '@/lib/api/axios';
import {
  BlogPost,
  PaginatedBlogPosts,
  BlogPostFilter,
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from '../types';

export const blogService = {
  async getAll(filter?: BlogPostFilter): Promise<PaginatedBlogPosts> {
    const response = await axiosInstance.get<PaginatedBlogPosts>('/blog', {
      params: filter,
    });
    return response.data;
  },

  async getById(id: string): Promise<BlogPost> {
    const response = await axiosInstance.get<BlogPost>(`/blog/${id}`);
    return response.data;
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    const response = await axiosInstance.get<BlogPost>(`/blog/slug/${slug}`);
    return response.data;
  },

  async create(data: CreateBlogPostDto): Promise<BlogPost> {
    const response = await axiosInstance.post<BlogPost>('/blog', data);
    return response.data;
  },

  async update(id: string, data: UpdateBlogPostDto): Promise<BlogPost> {
    const response = await axiosInstance.patch<BlogPost>(`/blog/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/blog/${id}`);
  },
};
