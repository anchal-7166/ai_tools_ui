import apiClient from './client';

export const tagsApi = {
  
  getAllTags: async () => {
    const { data } = await apiClient.get('/tags');
    return data;
  },

}