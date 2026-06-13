'use client';

import { ReactNode } from 'react';
import { PageLoader } from '@/components/page-loader';

interface HomePageClientProps {
  children: ReactNode;
}

export function HomePageClient({ children }: HomePageClientProps) {
  return (
    <>
      <PageLoader />
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}