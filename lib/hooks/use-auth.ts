'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/auth-store';
import type { LoginRequest, RegisterRequest, ApiError } from '@/types/auth.type';
import { AxiosError } from 'axios';

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
    
    console.log('🔍 Full API response:', data);
    console.log('🔍 User:', data.user);
    console.log('🔍 Access Token:', data.accessToken);
    console.log('🔍 Refresh Token:', data.refreshToken);

      // Save to Zustand store
      setAuth(data.user, data.accessToken, data.refreshToken);

      setTimeout(() => {
      router.push('/');
    }, 100);
      // Redirect to dashboard
      // router.push('/dashboard');
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Login failed:', error.response?.data?.message || error.message);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      router.push('/dashboard');
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      router.push('/login');
    },
    onError: () => {
      // Even if API fails, clear local state
      clearAuth();
      router.push('/login');
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });

  return {
    // State
    user,
    isAuthenticated,

    // Mutations
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,

    // Loading states
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,

    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,

    // Reset errors
    resetLoginError: loginMutation.reset,
    resetRegisterError: registerMutation.reset,
  };
}