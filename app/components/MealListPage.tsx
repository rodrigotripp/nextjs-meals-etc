'use client';

import { useParams } from 'next/navigation';
import { trpc } from '@/app/_trpc/client';
import { lazy, Suspense } from 'react';
import Link from 'next/link';

const LazySearchResults = lazy(() => import('@/app/components/SearchResults'));

type MealListPageProps = {
  type: 'category' | 'area';
};

export default function MealListPage({ type }: MealListPageProps) {
  const { mealRouter } = trpc;
  const params = useParams();
  const paramValue = params.id as string;

  const query =
    type === 'category'
      ? mealRouter.getMealByCategory.useQuery(
          { category: paramValue },
          { enabled: !!paramValue, refetchOnWindowFocus: false },
        )
      : mealRouter.getMealsByArea.useQuery(
          { area: paramValue },
          { enabled: !!paramValue, refetchOnWindowFocus: false },
        );

  return (
    <div className="p-4">
      <Link href="/meals" className="mb-4 block text-blue-500 hover:underline">
        &larr; Back to home page
      </Link>
      <h2 className="mb-6 text-2xl font-bold">{paramValue}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {query.data?.map((meal) => (
          <Suspense key={meal.idMeal} fallback={<div>Loading...</div>}>
            <LazySearchResults {...meal} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
