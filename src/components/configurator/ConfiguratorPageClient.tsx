'use client';

import { Suspense } from 'react';
import { ConfiguratorProvider } from '@/context/ConfiguratorContext';
import ConfiguratorLayout from '@/components/configurator/ConfiguratorLayout';

/** Suspense requis par useSearchParams (prerender Next). */
export default function ConfiguratorPageClient() {
  return (
    <Suspense fallback={null}>
      <ConfiguratorProvider>
        <ConfiguratorLayout />
      </ConfiguratorProvider>
    </Suspense>
  );
}
