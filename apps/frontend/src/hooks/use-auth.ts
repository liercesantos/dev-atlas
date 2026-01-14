'use client';

// This is a stub for future authentication logic
export function useAuth() {
  const user = null;
  const isAuthenticated = false;
  const isLoading = false;

  const login = async () => {};
  const logout = async () => {};

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
