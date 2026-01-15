"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    // In a real app, the token would be in an HTTP-only cookie
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
