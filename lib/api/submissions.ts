import { CreateSubmissionDto } from "@/types/submissions";
import apiClient from "./client";

export const submissionsApi = {
  create: (data: CreateSubmissionDto) => apiClient.post('/submissions', data),
  getMySubmissions: () => apiClient.get('/submissions/my'),
  getById: (id: string) => apiClient.get(`/submissions/my/${id}`),
  getMyPending: async (params: { page?: number; limit?: number } = {}) => {
    const { data } = await apiClient.get('/submissions/my/pending', { params });
    return data;
  },

};