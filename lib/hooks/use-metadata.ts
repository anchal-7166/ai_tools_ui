import { useQuery } from '@tanstack/react-query';
import { metadataApi } from '../api/metadata';
import { categoriesApi } from '../api/categories';
import { tagsApi } from '../api/tags';
import { industriesApi } from '../api/industries';
import { useCaseApi } from '../api/use-case';


// Fetch all enums
export function useEnums() {
  return useQuery({
    queryKey: ['enums'],
    queryFn: metadataApi.getAllEnums,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// Fetch all metadata in parallel
export function useAllMetadata() {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAllCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const tags = useQuery({
    queryKey: ['tags'],
    queryFn: tagsApi.getAllTags,
    staleTime: 1000 * 60 * 30,
  });

  const industries = useQuery({
    queryKey: ['industries'],
    queryFn: industriesApi.getAllIndustries,
    staleTime: 1000 * 60 * 30,
  });

  const useCases = useQuery({
    queryKey: ['use-cases'],
    queryFn: useCaseApi.getAllUseCase,
    staleTime: 1000 * 60 * 30,
  });

  const enums = useEnums();

  return {
    // Data
    categories: categories.data || [],
    tags: tags.data || [],
    industries: industries.data || [],
    useCases: useCases.data || [],
    enums: enums.data || {},
    
    // Loading states
    isLoading: 
      categories.isLoading || 
      tags.isLoading || 
      industries.isLoading || 
      useCases.isLoading || 
      enums.isLoading,
    
    // Error states
    isError: 
      categories.isError || 
      tags.isError || 
      industries.isError || 
      useCases.isError || 
      enums.isError,
    
    error: 
      categories.error || 
      tags.error || 
      industries.error || 
      useCases.error || 
      enums.error,
  };
}