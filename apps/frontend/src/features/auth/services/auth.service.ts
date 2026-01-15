import axiosInstance from '@/lib/api/axios';
import { LoginResponse } from '../types';

export const authService = {
  async login(credentials: any): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(data: any): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  },

  async getMe(): Promise<any> {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};
