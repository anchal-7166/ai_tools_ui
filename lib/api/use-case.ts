import apiClient from './client';

export const useCaseApi = {
  
  getAllUseCase: async () => {
    const { data } = await apiClient.get('/use-cases');
    return data;
  },

}