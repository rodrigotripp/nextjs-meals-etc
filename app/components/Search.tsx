'use client';

import { useState } from 'react';
import { trpc } from '../_trpc/client';
import { Meal } from '../types';
import SearchResults from './SearchResults';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const { mealRouter } = trpc;

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
              {searchResults.data.map((meal: Meal) => (
                <SearchResults key={meal.idMeal} {...meal} />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
