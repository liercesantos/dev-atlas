import { useQuery } from '@tanstack/react-query';
import { featureFlagsService, FeatureFlags } from '../services/feature-flags.service';

const DEFAULT_FLAGS: FeatureFlags = {
  ENABLE_BLOG: true,
  ENABLE_PROJECTS: true,
  ENABLE_ANALYTICS: false,
  ENABLE_CHAT: false,
};

export function useFeatureFlags() {
  const { data: flags, isLoading, error } = useQuery({
    queryKey: ['feature-flags'],
    queryFn: featureFlagsService.getFlags,
    initialData: DEFAULT_FLAGS,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isFeatureEnabled = (flagName: keyof FeatureFlags): boolean => {
    return flags?.[flagName] ?? DEFAULT_FLAGS[flagName];
  };

  return {
    flags,
    isLoading,
    error,
    isFeatureEnabled,
  };
}
