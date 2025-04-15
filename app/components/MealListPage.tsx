import { lazy, Suspense } from 'react';
import Link from 'next/link';
import SearchResults from './SearchResultSkeleton';
import { createCaller } from '../server';

const LazySearchResults = lazy(() => import('@/app/components/SearchResults'));

type MealListPageProps = {
  type: 'category' | 'area';
  argString: string;
};

export default async function MealListPage({ type, argString }: MealListPageProps) {
  const caller = createCaller({ headers: new Headers() });
  const query =
    type === 'category'
      ? await caller.mealRouter.getMealByCategory({ category: argString })
      : await caller.mealRouter.getMealsByArea({ area: argString });

  return (
    <div className="p-4">
      <Link href="/meals" className="mb-4 block text-blue-500 hover:underline">
        &larr; Back to home page
      </Link>
      <h2 className="mb-6 text-2xl font-bold">{argString}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {query.map((meal) => (
          <Suspense key={meal.idMeal} fallback={<SearchResults />}>
            <LazySearchResults {...meal} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
