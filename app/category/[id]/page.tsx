'use client';

import { useParams } from 'next/navigation';
import { trpc } from '@/app/_trpc/client';
import { lazy, Suspense } from 'react';
const LazySearchResults = lazy(() => import('@/app/components/SearchResults'));

export default function Category() {
  const { mealRouter } = trpc;
  const params = useParams();
  const category = params.id as string;
  const meals = mealRouter.getMealByCategory.useQuery(
    { category },
    { enabled: !!category, refetchOnWindowFocus: false },
  );
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meals.data?.map((meal) =>
          <Suspense key={meal.idMeal} fallback={<div>Loading...</div>}>
            <LazySearchResults key={meal.idMeal} {...meal} />
          </Suspense>
      )}
    </div>
  );
}
