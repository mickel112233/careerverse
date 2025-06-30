
import { Suspense } from 'react';
import ShopClient from './client';
import { Skeleton } from '@/components/ui/skeleton';

const ShopLoadingSkeleton = () => (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="mb-8">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/2 mt-2" />
        </div>
        <Skeleton className="h-12 w-full max-w-sm mb-6" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-96 w-full" />
            ))}
        </div>
    </div>
);

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoadingSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}
