'use client';

import { useState } from 'react';
import { trpc } from '../_trpc/client';
import Image from 'next/image';
import Link from 'next/link';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const {mealRouter} = trpc;

  const searchResults = mealRouter.searchMeals.useQuery(
    { query: searchQuery },
    {
      enabled: searchQuery.length > 0,
      refetchOnWindowFocus: false,
    },
  );
  
  return (
    <>
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
    </>
  )
}
