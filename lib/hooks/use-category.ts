import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '../api/categories';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAllCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes - categories rarely change
  });
}

export function useCategoryById(id: string) {
  const { data: categories } = useCategories();
  
  return {
    category: categories?.find((cat: any) => cat.id === id),
    isLoading: !categories,
  };
}

export function useCategoryBySlug(slug: string) {
  const { data: categories } = useCategories();
  
  return {
    category: categories?.find((cat: any) => cat.slug === slug),
    isLoading: !categories,
  };
}