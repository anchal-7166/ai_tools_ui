// src/lib/hooks/use-tools.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toolsApi } from '@/lib/api/tools';
import { filtersApi } from '@/lib/api/filters';
import type { FilterQuery } from '@/types/tool.types';

export function useTools(params: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ['tools', params],
    queryFn: () => toolsApi.getAll(params),
    staleTime: 30000, // 30 seconds
  });
}

export function useFeaturedTools(limit: number = 10) {
  return useQuery({
    queryKey: ['tools', 'featured', limit],
    queryFn: () => toolsApi.getFeatured(limit),
    staleTime: 60000, // 1 minute
  });
}

export function useTrendingTools(limit: number = 20) {
  return useQuery({
    queryKey: ['tools', 'trending', limit],
    queryFn: () => toolsApi.getTrending(limit),
    staleTime: 30000,
  });
}

export function useNewTools(limit: number = 20) {
  return useQuery({
    queryKey: ['tools', 'new', limit],
    queryFn: () => toolsApi.getNew(limit),
    staleTime: 60000,
  });
}

export function useToolBySlug(slug: string) {
  return useQuery({
    queryKey: ['tools', slug],
    queryFn: () => toolsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useFilteredTools(filterQuery: FilterQuery) {
  return useQuery({
    queryKey: ['tools', 'filtered', filterQuery],
    queryFn: () => filtersApi.search(filterQuery),
    enabled: !!filterQuery,
    staleTime: 15000, // 15 seconds
  });
}

export function useGlobalSearch(searchTerm: string, filters: any = {}) {
  return useQuery({
    queryKey: ['tools', 'search', searchTerm, filters],
    queryFn: () =>
      filtersApi.globalSearch({
        prompt: searchTerm,
        all: true,
        ...filters,
      }),
    enabled: searchTerm.length > 0,
    staleTime: 10000,
  });
}

export function useFilterOptions() {
  return useQuery({
    queryKey: ['filters', 'options'],
    queryFn: () => filtersApi.getFilterOptions(),
    staleTime: 300000, // 5 minutes
  });
}

export function useTrackClick() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => toolsApi.trackClick(slug),
    onSuccess: () => {
      // Optionally refetch tools to update click counts
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
}