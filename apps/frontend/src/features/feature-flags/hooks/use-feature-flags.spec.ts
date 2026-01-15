import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useFeatureFlags } from './use-feature-flags';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('useFeatureFlags', () => {
  it('should return default flags when loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useFeatureFlags());

    expect(result.current.isFeatureEnabled('ENABLE_BLOG')).toBe(true);
    expect(result.current.isLoading).toBe(true);
  });

  it('should return flags from the API', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { ENABLE_BLOG: false },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useFeatureFlags());

    expect(result.current.isFeatureEnabled('ENABLE_BLOG')).toBe(false);
  });
});
