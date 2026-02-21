import apiClient from './client';

export const reviewsApi = {
  // Create a review
  createReview: async (reviewData: {
    toolSlug: string;
    rating: number;
    title?: string;
    comment: string;
  }) => {
    console.log(reviewData)
    const { data } = await apiClient.post('/reviews', reviewData);
    return data;
  },

  // Get reviews for a tool
  getToolReviews: async (slug: string, page: number = 1, limit: number = 20) => {
    const { data } = await apiClient.get(`/reviews/tool/${slug}`, {
      params: { page, limit },
    });
    return data;
  },

  // Get review statistics
  getReviewStats: async (slug: string) => {
    const { data } = await apiClient.get(`/reviews/tool/${slug}/stats`);
    return data;
  },

  // Get user's review for a tool
  getMyReviewForTool: async (slug: string) => {
    const { data } = await apiClient.get(`/reviews/tool/${slug}/my-review`);
    return data;
  },

  // Get all user's reviews
  getMyReviews: async (page: number = 1, limit: number = 20) => {
    const { data } = await apiClient.get('/reviews/my-reviews', {
      params: { page, limit },
    });
    return data;
  },

  // Update a review
  updateReview: async (reviewId: string, reviewData: {
    rating?: number;
    title?: string;
    comment?: string;
  }) => {
    const { data } = await apiClient.patch(`/reviews/${reviewId}`, reviewData);
    return data;
  },

  // Delete a review
  deleteReview: async (reviewId: string) => {
    const { data } = await apiClient.delete(`/reviews/${reviewId}`);
    return data;
  },

  // Mark review as helpful
  markHelpful: async (reviewId: string) => {
    const { data } = await apiClient.post(`/reviews/${reviewId}/helpful`);
    return data;
  },
};