import axiosInstance from '@/lib/api/axios';
import { LoginResponse, User } from '../types';

export const authService = {
  async login(credentials: Record<string, unknown>): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(data: Record<string, unknown>): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  },

  async getMe(): Promise<User> {
    const response = await axiosInstance.get<User>('/auth/me');
    return response.data;
  },
};
