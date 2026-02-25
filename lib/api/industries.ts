import apiClient from './client';

export const industriesApi = {
  
  getAllIndustries: async () => {
    const { data } = await apiClient.get('/industries');
    return data;
  },

}