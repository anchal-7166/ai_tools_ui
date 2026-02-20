// src/lib/api/filters.ts
import apiClient from './client';
import type { FilterOption, ToolsResponse, FilterQuery } from '@/types/tool.types';

export const filtersApi = {
  /**
   * Get available filter options
   */
  getFilterOptions: async (): Promise<FilterOption[]> => {
    const { data } = await apiClient.get<FilterOption[]>('/filters/tools');
    return data;
  },

  /**
   * Search tools with advanced filters
   */
  search: async (filterQuery: FilterQuery): Promise<ToolsResponse> => {
    const { data } = await apiClient.post<ToolsResponse>('/filters/tools/search', filterQuery);
    return data;
  },

  /**
   * Global text search
   */
  globalSearch: async (params: {
    prompt: string;
    all?: boolean;
    name?: boolean;
    tagline?: boolean;
    description?: boolean;
    platformType?: string[];
    categories?: string[];
    tags?: string[];
  }): Promise<ToolsResponse> => {
    const { data } = await apiClient.get<ToolsResponse>('/filters/tools/global-search', {
      params,
    });
    return data;
  },
};