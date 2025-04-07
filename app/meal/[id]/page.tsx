'use client';

import { useParams } from 'next/navigation';
import { trpc } from '../../_trpc/client';
import Link from 'next/link';
import Image from 'next/image';

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const mealQuery = trpc.mealRouter.getMealById.useQuery(
    { id },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    },
  );

  if (!id) {
    return <div className="container mx-auto p-4">Invalid meal ID</div>;
  }

  if (mealQuery.isLoading) {
    return <div className="container mx-auto p-4">Loading meal details...</div>;
  }

  if (mealQuery.error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {mealQuery.error.message}</div>
    );
  }

  const meal = mealQuery.data;

  if (!meal) return null;

  return (
    <div className="container mx-auto p-4">
      <Link href="/meals" className="mb-4 block text-blue-500 hover:underline">
        &larr; Back to meal list
      </Link>

      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3">
            {meal.strMealThumb && (
              <Image
                width={400}
                height={400}
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-auto w-full object-cover"
              />
            )}
          </div>
          <div className="p-4 md:w-2/3">
            <h1 className="mb-2 text-2xl font-bold">{meal.strMeal}</h1>
            <div className="mb-4">
              {meal.strCategory && (
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {meal.strArea}
                </span>
              )}
              {meal.strTags &&
                meal.strTags.split(',').map((tag) => (
                  <span
                    key={tag.trim()}
                    className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>

            <h2 className="mb-2 text-xl font-semibold">Instructions</h2>
            <p className="mb-4 text-gray-700">{meal.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
