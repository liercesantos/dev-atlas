import axios from 'axios';
import { LoginResponse, User } from '../types';

const api = axios.create({
  baseURL: '/api/auth',
});

export const authService = {
  async login(credentials: Record<string, unknown>): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', credentials);
    return response.data;
  },

  async register(data: Record<string, unknown>): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
  },

  async getMe(): Promise<User> {
    const response = await api.get<User>('/me');
    return response.data;
  },
};
