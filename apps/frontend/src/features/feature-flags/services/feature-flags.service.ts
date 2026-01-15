import axiosInstance from '@/lib/api/axios';

export type FeatureFlags = {
  ENABLE_BLOG: boolean;
  ENABLE_PROJECTS: boolean;
  ENABLE_ANALYTICS: boolean;
  ENABLE_CHAT: boolean;
};

export const featureFlagsService = {
  getFlags: async (): Promise<FeatureFlags> => {
    const { data } = await axiosInstance.get<FeatureFlags>('/feature-flags');
    return data;
  },
};
