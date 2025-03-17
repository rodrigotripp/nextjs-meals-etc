// app/meals/page.tsx
'use client';

import { useState } from 'react';
import { trpc } from '../_trpc/client';
import Link from 'next/link';
import Image from 'next/image';

export default function MealsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Use tRPC hooks to fetch data
  const randomMeal = trpc.meal.getRandomMeal.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const searchResults = trpc.meal.searchMeals.useQuery(
    { query: searchQuery },
    {
      enabled: searchQuery.length > 0,
      refetchOnWindowFocus: false,
    },
  );

  console.log('searchQuery', searchQuery);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">TheMealDB Explorer</h1>

      {/* Random Meal Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Random Meal</h2>
        {randomMeal.isLoading ? (
          <p>Loading random meal...</p>
        ) : randomMeal.error ? (
          <p className="text-red-500">Error loading meal: {randomMeal.error.message}</p>
        ) : randomMeal.data ? (
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">{randomMeal.data.strMeal}</h3>
            {randomMeal.data.strMealThumb && (
              <Image
                src={randomMeal.data.strMealThumb}
                alt={randomMeal.data.strMeal}
                className="my-2 h-48 w-48 rounded object-cover"
                width={400}
                height={400}
              />
            )}
            <p>
              <strong>Category:</strong> {randomMeal.data.strCategory}
            </p>
            <p>
              <strong>Origin:</strong> {randomMeal.data.strArea}
            </p>
            <Link href={`/meal/${randomMeal.data.idMeal}`}>
              <p>
                <strong>ID:{randomMeal.data.idMeal}</strong>
              </p>
            </Link>
            <button
              onClick={() => randomMeal.refetch()}
              className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Get Another Random Meal
            </button>
          </div>
        ) : null}
      </div>

      {/* Search Section */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Search Meals</h2>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for meals..."
            className="w-full max-w-md rounded border px-4 py-2 text-black"
          />
        </div>

        {searchQuery.length > 0 && (
          <div>
            {searchResults.isLoading ? (
              <p>Searching...</p>
            ) : searchResults.error ? (
              <p className="text-red-500">Error: {searchResults.error.message}</p>
            ) : searchResults.data?.length === 0 ? (
              <p>No results found</p>
            ) : searchResults.data ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.data.map((meal) => (
                  <div key={meal.idMeal} className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">{meal.strMeal}</h3>
                    {meal.strMealThumb && (
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="my-2 h-32 w-32 rounded object-cover"
                        width={400}
                        height={400}
                      />
                    )}
                    <p>
                      <strong>Category:</strong> {meal.strCategory}
                    </p>
                    <Link
                      href={`/meal/${meal.idMeal}`}
                      className="mt-2 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
