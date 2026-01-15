'use client';

import * as React from 'react';
import { useFeatureFlags } from '../hooks/use-feature-flags';
import { FeatureFlags } from '../services/feature-flags.service';

interface FeatureProps {
  name: keyof FeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Feature({ name, children, fallback = null }: FeatureProps) {
  const { isFeatureEnabled, isLoading } = useFeatureFlags();

  if (isLoading) {
    return null;
  }

  return isFeatureEnabled(name) ? <>{children}</> : <>{fallback}</>;
}
