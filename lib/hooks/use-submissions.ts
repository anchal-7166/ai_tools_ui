import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { submissionsApi } from '../api/submissions';
import { toast } from 'sonner';

export function useCreateSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submissionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', 'my'] });
      toast.success('Tool submitted successfully! Review in 2-3 business days.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to submit tool';
      toast.error(message);
    },
  });
}

export function useMySubmissions() {
  return useQuery({
    queryKey: ['submissions', 'my'],
    queryFn: submissionsApi.getMySubmissions,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSubmissionById(id: string) {
  return useQuery({
    queryKey: ['submissions', 'my', id],
    queryFn: () => submissionsApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}