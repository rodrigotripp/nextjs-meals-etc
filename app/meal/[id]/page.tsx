// app/meal/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { trpc } from '../../_trpc/client';
import Link from 'next/link';

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const mealQuery = trpc.meal.getMealById.useQuery(
    { id }, 
    { 
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );

  if (!id) {
    return <div className="container mx-auto p-4">Invalid meal ID</div>;
  }

  if (mealQuery.isLoading) {
    return <div className="container mx-auto p-4">Loading meal details...</div>;
  }

  if (mealQuery.error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {mealQuery.error.message}</div>;
  }

  const meal = mealQuery.data;
  
  if (!meal) return null;
  
  return (
    <div className="container mx-auto p-4">
      <Link
        href="/meals"
        className="text-blue-500 hover:underline mb-4 block"
      >
        &larr; Back to meal list
      </Link>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {meal.strMealThumb && (
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-full h-auto object-cover"
              />
            )}
          </div>
          <div className="p-4 md:w-2/3">
            <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
            <div className="mb-4">
              {meal.strCategory && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {meal.strArea}
                </span>
              )}
              {meal.strTags && meal.strTags.split(',').map(tag => (
                <span key={tag.trim()} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag.trim()}
                </span>
              ))}
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <p className="text-gray-700 mb-4">{meal.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}