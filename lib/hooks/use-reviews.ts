// src/lib/hooks/use-reviews.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviews';

export function useToolReviews(slug: string, page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ['reviews', 'tool', slug, page, limit],
    queryFn: () => reviewsApi.getToolReviews(slug, page, limit),
    enabled: !!slug,
    staleTime: 60000, // 1 minute
  });
}

export function useReviewStats(slug: string) {
  return useQuery({
    queryKey: ['reviews', 'stats', slug],
    queryFn: () => reviewsApi.getReviewStats(slug),
    enabled: !!slug,
    staleTime: 60000,
  });
}

export function useMyReviewForTool(slug: string) {
  return useQuery({
    queryKey: ['reviews', 'my-review', slug],
    queryFn: () => reviewsApi.getMyReviewForTool(slug),
    enabled: !!slug,
    staleTime: 60000,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewsApi.createReview,
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['reviews', 'tool', variables.toolSlug] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'stats', variables.toolSlug] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'my-review', variables.toolSlug] });
      queryClient.invalidateQueries({ queryKey: ['tool', variables.toolSlug] });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: string; data: any }) =>
      reviewsApi.updateReview(reviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewsApi.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useMarkHelpful() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewsApi.markHelpful,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}