import { useQuery } from '@tanstack/react-query';
import { tagsApi } from '../api/tags';
import { useAuthStore } from '../store/auth-store';
import { toolsApi } from '../api/tools';

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: tagsApi.getAllTags,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useTagById(id: string) {
  const { data: tags } = useTags();
  
  return {
    tag: tags?.find((tag: any) => tag.id === id),
    isLoading: !tags,
  };
}

export function useTagBySlug(slug: string) {
  const { data: tags } = useTags();
  
  return {
    tag: tags?.find((tag: any) => tag.slug === slug),
    isLoading: !tags,
  };
}

export function usePopularTags(limit: number = 10) {
  const { data: tags, isLoading } = useTags();
  
  return {
    tags: tags
      ?.sort((a: any, b: any) => b.usageCount - a.usageCount)
      .slice(0, limit),
    isLoading,
  };
}


