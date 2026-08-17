'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toolsApi } from '@/lib/api/tools';
import { filtersApi } from '@/lib/api/filters';
import type { FilterQuery } from '@/types/tool.types';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth-store';

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


export function useFilteredTools(filterQuery: FilterQuery) {
  return useQuery({
    queryKey: ['tools', 'filtered', filterQuery],
    queryFn: () => filtersApi.search(filterQuery),
    enabled: !!filterQuery,
    staleTime: 15000, // 15 seconds
  });
}


export function useFilterOptions() {
  return useQuery({
    queryKey: ['filters', 'options'],
    queryFn: () => filtersApi.getFilterOptions(),
    staleTime: 300000, // 5 minutes
  });
}


// src/lib/hooks/use-tools.ts - Add these hooks
export function useToolBySlug(slug: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['tool', slug],
    queryFn: async () => {
      const data = await toolsApi.getBySlug(slug);
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      return data;
    },
    staleTime: 0,
    refetchOnMount: 'always',
    enabled: !!slug,
  });
}

export function useToolById(id: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['tool', id],
    queryFn: async () => {
      const data = await toolsApi.getById(id);
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      return data;
    },
    staleTime: 0,
    refetchOnMount: 'always',
    enabled: !!id,
  });
}

export function useSimilarTools(slug: string, limit: number = 6) {
  return useQuery({
    queryKey: ['tools', 'similar', slug, limit],
    queryFn: () => toolsApi.getSimilar(slug, limit),
    staleTime: 300000,
    enabled: !!slug,
  });
}


export function useGlobalSearch(searchTerm: string, filters?: any, options?: any) {
  return useQuery({
    queryKey: ['tools', 'search', searchTerm, filters],
    queryFn: () => filtersApi.globalSearch({ 
      prompt: searchTerm,
      ...filters 
    }),
    enabled: options?.enabled !== false && searchTerm.length > 0,
    staleTime: 10000,
  });
}



export function useTrackClick() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => toolsApi.trackClick(slug),
    onSuccess: () => {
      // Invalidate all tools list queries so viewCount is fresh
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
    // Silent — don't surface errors to user, tracking is best-effort
    onError: () => {},
  });
}

/**
 * useToggleFavorite
 * Optimistically toggles the heart icon instantly, then confirms via API.
 * Rolls back if the API call fails.
 * Redirects to login if unauthenticated.
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: ({ toolId }: { toolId: string; toolSlug: string }) => {
      if (!isAuthenticated) {
        throw new Error('AUTH_REQUIRED');
      }
      return toolsApi.toggleFavorite(toolId);
    },

    // Optimistic update — flip favorited state + update count immediately
    onMutate: async ({ toolId, toolSlug }) => {
      if (!isAuthenticated) return;

      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['tools'] });

      // Snapshot the previous value for rollback
      const previousData = queryClient.getQueriesData({ queryKey: ['tools'] });

      // Optimistically update every cached tools list that contains this tool
      queryClient.setQueriesData({ queryKey: ['tools'] }, (old: any) => {
        if (!old) return old;

        const updateTool = (tool: any) => {
          if (tool.id !== toolId) return tool;
          const wasFavorited = tool._favorited ?? false;
          return {
            ...tool,
            _favorited: !wasFavorited,
            favoriteCount: wasFavorited
              ? Math.max(0, (tool.favoriteCount ?? 0) - 1)
              : (tool.favoriteCount ?? 0) + 1,
          };
        };

        // Handle paginated shape { data: Tool[], meta: ... }
        if (Array.isArray(old?.data)) {
          return { ...old, data: old.data.map(updateTool) };
        }
        // Handle flat array
        if (Array.isArray(old)) {
          return old.map(updateTool);
        }
        return old;
      });

      return { previousData };
    },

    onError: (error: any, _, context) => {
      // Roll back on failure
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]: [any, any]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      if (error.message === 'AUTH_REQUIRED') {
        toast.error('Please log in to save favorites');
      } else {
        toast.error('Could not update favorite. Please try again.');
      }
    },

    onSettled: () => {
      // Always refetch after mutation to sync with server truth
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
}


export function useCheckFavorite(toolId: string) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['tools', 'favorite', toolId],
    queryFn: () => toolsApi.checkFavorite(toolId),
    enabled: !!toolId && isAuthenticated, 
    staleTime: 60000,
  });
}


export function useMyPublishedTools(params: { page?: number; limit?: number } = {}) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['tools', 'my', 'published', params],
    queryFn: () => toolsApi.getMyPublished(params),
    enabled: isAuthenticated,
    staleTime: 30000,
  });
}



export function useMySavedTools(params: { page?: number; limit?: number } = {}) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['tools', 'my', 'saved', params],
    queryFn: () => toolsApi.getMySaved(params),
    enabled: isAuthenticated,
    staleTime: 30000,
  });
}