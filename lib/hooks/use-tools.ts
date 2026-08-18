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

      // Cancel outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['tools'] });
      await queryClient.cancelQueries({ queryKey: ['tool'] });

      // Determine current favorited status from favorite check cache or tool cache
      const favCheckData: any = queryClient.getQueryData(['tools', 'favorite', toolId]);
      
      let currentlyFavorited = false;
      if (favCheckData && typeof favCheckData.isFavorited === 'boolean') {
        currentlyFavorited = favCheckData.isFavorited;
      } else {
        const toolData: any = queryClient.getQueryData(['tool', toolId]) || queryClient.getQueryData(['tool', toolSlug]);
        if (toolData && typeof toolData._favorited === 'boolean') {
          currentlyFavorited = toolData._favorited;
        }
      }

      const nextFavorited = !currentlyFavorited;

      // Snapshot previous values for rollback
      const previousFavData = queryClient.getQueryData(['tools', 'favorite', toolId]);
      const previousToolsData = queryClient.getQueriesData({ queryKey: ['tools'] });
      const previousToolData = queryClient.getQueriesData({ queryKey: ['tool'] });

      // 1. Optimistically update ['tools', 'favorite', toolId]
      queryClient.setQueryData(['tools', 'favorite', toolId], { isFavorited: nextFavorited });

      // 2. Helper to update a tool object
      const updateToolObj = (t: any) => {
        if (!t || (t.id !== toolId && t.slug !== toolSlug)) return t;
        const currentCount = t.favoriteCount ?? 0;
        const newCount = nextFavorited
          ? currentCount + 1
          : Math.max(0, currentCount - 1);
        return {
          ...t,
          _favorited: nextFavorited,
          favoriteCount: newCount,
        };
      };

      // 3. Optimistically update ['tools'] list queries
      queryClient.setQueriesData({ queryKey: ['tools'] }, (old: any) => {
        if (!old) return old;
        if (Array.isArray(old?.data)) {
          return { ...old, data: old.data.map(updateToolObj) };
        }
        if (Array.isArray(old)) {
          return old.map(updateToolObj);
        }
        return old;
      });

      // 4. Optimistically update single ['tool'] detail queries
      queryClient.setQueriesData({ queryKey: ['tool'] }, (old: any) => {
        if (!old) return old;
        return updateToolObj(old);
      });

      return { previousFavData, previousToolsData, previousToolData };
    },

    onError: (error: any, { toolId }, context) => {
      // Roll back on failure
      if (context?.previousFavData !== undefined) {
        queryClient.setQueryData(['tools', 'favorite', toolId], context.previousFavData);
      }
      if (context?.previousToolsData) {
        context.previousToolsData.forEach(([queryKey, data]: [any, any]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousToolData) {
        context.previousToolData.forEach(([queryKey, data]: [any, any]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      if (error.message === 'AUTH_REQUIRED') {
        toast.error('Please log in to save favorites');
      } else {
        toast.error('Could not update favorite. Please try again.');
      }
    },

    onSuccess: (data: any, { toolId }) => {
      if (data && typeof data.liked === 'boolean') {
        queryClient.setQueryData(['tools', 'favorite', toolId], { isFavorited: data.liked });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tools', 'my', 'saved'] });
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