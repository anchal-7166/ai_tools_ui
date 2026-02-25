import apiClient from './client';

export const metadataApi = {
  // Fetch all enums
  getAllEnums: async () => {
    const { data } = await apiClient.get('/enums');
    return data;
  },
  
  // Individual enum endpoints (optional)
  getPlatformTypes: async () => {
    const { data } = await apiClient.get('/enums/platform-types');
    return data;
  },
  
  getTargetAudiences: async () => {
    const { data } = await apiClient.get('/enums/target-audiences');
    return data;
  },
  
  getPricingTypes: async () => {
    const { data } = await apiClient.get('/enums/pricing-types');
    return data;
  },
  
  getBillingCycles: async () => {
    const { data } = await apiClient.get('/enums/billing-cycles');
    return data;
  },
};