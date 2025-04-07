'use client';

import { useState, useEffect } from 'react';
import { trpc } from '../_trpc/client';
import Link from 'next/link';
import Image from 'next/image';
import RandomMeal from '../components/RandomMeal';

export default function MealsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const {mealRouter, weatherRouter} = trpc;
  const searchWeather = weatherRouter.searchCityWeather.useQuery({search: 'mexico'})

  const searchResults = mealRouter.searchMeals.useQuery(
    { query: searchQuery },
    {
      enabled: searchQuery.length > 0,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(()=> {
    console.log(searchWeather.data)
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">TheMealDB Explorer</h1>
      <RandomMeal />
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
