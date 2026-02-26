import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useAuthStore } from '../store/auth-store';
import { UpdateUserPayload, usersApi } from '../api/user';

// ── Current user ──

export function useMe() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => usersApi.getMe(),
    enabled: isAuthenticated,
    staleTime: 60000, // 1 min
  });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => usersApi.updateMe(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(['user', 'me'], updated);
      toast.success('Profile updated successfully');
    },
    onError: () => {
      toast.error('Failed to update profile. Please try again.');
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => usersApi.changePassword(payload),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'Failed to change password.';
      toast.error(msg);
    },
  });
}

export function useDeactivateAccount() {
  const { logout } = useAuthStore();
  return useMutation({
    mutationFn: () => usersApi.deactivateAccount(),
    onSuccess: () => {
      toast.success('Account deactivated');
      logout();
    },
    onError: () => {
      toast.error('Failed to deactivate account. Please try again.');
    },
  });
}

// ── Public profile ──

export function useUserByUsername(username: string) {
  return useQuery({
    queryKey: ['user', 'profile', username],
    queryFn: () => usersApi.getByUsername(username),
    enabled: !!username,
    staleTime: 120000, // 2 min
  });
}

// ── Admin only ──

export function useAllUsers(params: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ['users', 'admin', params],
    queryFn: () => usersApi.getAllUsers(params),
    staleTime: 30000,
  });
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ['users', 'admin', id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
    staleTime: 30000,
  });
}

export function useChangeUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      usersApi.changeUserRole(id, role as any),
    onSuccess: (updated) => {
      // Update the user in any cached admin list
      queryClient.invalidateQueries({ queryKey: ['users', 'admin'] });
      queryClient.setQueryData(['users', 'admin', updated.id], updated);
      toast.success(`Role changed to ${updated.role}`);
    },
    onError: () => {
      toast.error('Failed to change user role.');
    },
  });
}