
import ShopClient from './client';
import { Suspense } from 'react';

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Item Shop</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Purchase perks, memberships, and currencies to enhance your experience.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopClient searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
