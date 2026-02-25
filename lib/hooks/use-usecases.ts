import { useQuery } from '@tanstack/react-query';
import { useCaseApi } from '../api/use-case';


export function useUseCases() {
  return useQuery({
    queryKey: ['use-cases'],
    queryFn: useCaseApi.getAllUseCase,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useUseCaseById(id: string) {
  const { data: useCases } = useUseCases();
  
  return {
    useCase: useCases?.find((uc: any) => uc.id === id),
    isLoading: !useCases,
  };
}

export function useUseCaseBySlug(slug: string) {
  const { data: useCases } = useUseCases();
  
  return {
    useCase: useCases?.find((uc: any) => uc.slug === slug),
    isLoading: !useCases,
  };
}