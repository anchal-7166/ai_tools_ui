import apiClient from './client';

export interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  role: 'USER' | 'CREATOR' | 'ADMIN' | 'MODERATOR';
  isVerified: boolean;
  isActive: boolean;
  industry?: string;
  jobRole?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UpdateUserPayload {
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  industry?: string;
  jobRole?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const usersApi = {
  // GET /users/me
  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get('/users/me');
    return data;
  },

  // PATCH /users/me
  updateMe: async (payload: UpdateUserPayload): Promise<User> => {
    const { data } = await apiClient.patch('/users/me', payload);
    return data;
  },

  // PATCH /users/me/password
  changePassword: async (payload: ChangePasswordPayload): Promise<{ message: string }> => {
    const { data } = await apiClient.patch('/users/me/password', payload);
    return data;
  },

  // DELETE /users/me
  deactivateAccount: async (): Promise<{ message: string }> => {
    const { data } = await apiClient.delete('/users/me');
    return data;
  },

  // GET /users/:username
  getByUsername: async (username: string): Promise<User> => {
    const { data } = await apiClient.get(`/users/${username}`);
    return data;
  },

  // ── Admin only ──

  // GET /users?page=&limit=
  getAllUsers: async (params: { page?: number; limit?: number } = {}): Promise<UsersResponse> => {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },

  // GET /users/admin/:id
  getUserById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get(`/users/admin/${id}`);
    return data;
  },

  // PATCH /users/:id/role
  changeUserRole: async (id: string, role: User['role']): Promise<User> => {
    const { data } = await apiClient.patch(`/users/${id}/role`, { role });
    return data;
  },
};