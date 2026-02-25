import apiClient from './client';

export const categoriesApi = {
  
  getAllCategories: async () => {
    const { data } = await apiClient.get('/categories');
    return data;
  },

}