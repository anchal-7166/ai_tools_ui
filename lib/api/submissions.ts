import { CreateSubmissionDto } from "@/types/submissions";
import apiClient from "./client";

export const submissionsApi = {
  create: (data: CreateSubmissionDto) => apiClient.post('/submissions', data),
  getMySubmissions: () => apiClient.get('/submissions/my'),
  getById: (id: string) => apiClient.get(`/submissions/my/${id}`),

};