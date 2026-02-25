import { useQuery } from '@tanstack/react-query';
import { industriesApi } from '../api/industries';

export function useIndustries() {
  return useQuery({
    queryKey: ['industries'],
    queryFn: industriesApi.getAllIndustries,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useIndustryById(id: string) {
  const { data: industries } = useIndustries();
  
  return {
    industry: industries?.find((ind: any) => ind.id === id),
    isLoading: !industries,
  };
}

export function useIndustryBySlug(slug: string) {
  const { data: industries } = useIndustries();
  
  return {
    industry: industries?.find((ind: any) => ind.slug === slug),
    isLoading: !industries,
  };
}