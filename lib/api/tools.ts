// src/lib/api/tools.ts
import apiClient from './client';
import type { Tool, ToolsResponse, Category, Tag } from '@/types/tool.types';

export const toolsApi = {
  /**
   * Get all published tools with pagination
   */
  getAll: async (params: { page?: number; limit?: number } = {}): Promise<ToolsResponse> => {
    const { data } = await apiClient.get<ToolsResponse>('/tools', { params });
    return data;
  },

  /**
   * Get featured tools
   */
  getFeatured: async (limit: number = 10): Promise<Tool[]> => {
    const { data } = await apiClient.get<Tool[]>('/tools/featured', {
      params: { limit },
    });
    return data;
  },

  /**
   * Get trending tools
   */
  getTrending: async (limit: number = 20): Promise<Tool[]> => {
    const { data } = await apiClient.get<Tool[]>('/tools/trending', {
      params: { limit },
    });
    return data;
  },

  /**
   * Get top rated tools
   */
  getTopRated: async (limit: number = 20): Promise<Tool[]> => {
    const { data } = await apiClient.get<Tool[]>('/tools/top-rated', {
      params: { limit },
    });
    return data;
  },

  /**
   * Get new tools
   */
  getNew: async (limit: number = 20): Promise<Tool[]> => {
    const { data } = await apiClient.get<Tool[]>('/tools/new', {
      params: { limit },
    });
    return data;
  },


  /**
   * Get tools by category
   */
  getByCategory: async (slug: string, limit: number = 20): Promise<Tool[]> => {
    const { data } = await apiClient.get<Tool[]>(`/tools/category/${slug}`, {
      params: { limit },
    });
    return data;
  },

  /**
   * Get tools by tag
   */
  getByTag: async (slug: string, limit: number = 20): Promise<Tool[]> => {
    const { data } = await apiClient.get<Tool[]>(`/tools/tag/${slug}`, {
      params: { limit },
    });
    return data;
  },

  /**
   * Get platform stats
   */
  getStats: async (): Promise<{
    totalTools: number;
    totalViews: number;
    totalReviews: number;
  }> => {
    const { data } = await apiClient.get('/tools/stats');
    return data;
  },

  getBySlug: async (slug: string) => {
    const { data } = await apiClient.get(`/tools/${slug}`);
    return data;
  },
  getById: async (id: string) => {
    const { data } = await apiClient.get(`/tools/id/${id}`);
    return data;
  },

  // Get similar tools
  getSimilar: async (slug: string, limit: number = 6) => {
    const { data } = await apiClient.get(`/tools/${slug}/similar`, {
      params: { limit }
    });
    return data;
  },

  // Track click
  trackClick: async (slug: string) => {
    const { data } = await apiClient.post(`/tools/${slug}/click`);
    return data;
  },

  // POST /tools/:id/favorite  — toggles favorite for the logged-in user
  toggleFavorite: async (id: string): Promise<{ favorited: boolean; favoriteCount: number }> => {
    const { data } = await apiClient.post(`/tools/${id}/favorite`);
    return data;
  },

  async checkFavorite(toolId: string): Promise<{ isFavorited: boolean }> {
    const res = await apiClient.get(`/tools/${toolId}/favorite/check`);
    return res.data;
  },


  // 1. Get all published tools by logged-in user
 getMyPublished: async (params: { page?: number; limit?: number } = {}): Promise<ToolsResponse> => {
  const { data } = await apiClient.get<ToolsResponse>('/tools/my/published', { params });
  return data;
},

// 3. Get all saved/favorited tools by logged-in user
getMySaved: async (params: { page?: number; limit?: number } = {}): Promise<ToolsResponse> => {
  const { data } = await apiClient.get<ToolsResponse>('/tools/my/saved', { params });
  return data;
},

};