export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
