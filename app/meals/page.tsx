// app/meals/page.tsx
'use client';

import { useState } from 'react';
import { trpc } from '../_trpc/client';
import Link from 'next/link';

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
    }
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">TheMealDB Explorer</h1>
      
      {/* Random Meal Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Random Meal</h2>
        {randomMeal.isLoading ? (
          <p>Loading random meal...</p>
        ) : randomMeal.error ? (
          <p className="text-red-500">Error loading meal: {randomMeal.error.message}</p>
        ) : randomMeal.data ? (
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium">{randomMeal.data.strMeal}</h3>
            {randomMeal.data.strMealThumb && (
              <img 
                src={randomMeal.data.strMealThumb} 
                alt={randomMeal.data.strMeal} 
                className="w-48 h-48 object-cover rounded my-2"
              />
            )}
            <p><strong>Category:</strong> {randomMeal.data.strCategory}</p>
            <p><strong>Origin:</strong> {randomMeal.data.strArea}</p>
            <button
              onClick={() => randomMeal.refetch()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Get Another Random Meal
            </button>
          </div>
        ) : null}
      </div>
      
      {/* Search Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Search Meals</h2>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for meals..."
            className="px-4 py-2 border rounded w-full max-w-md"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.data.map((meal) => (
                  <div key={meal.idMeal} className="border p-4 rounded-lg">
                    <h3 className="text-lg font-medium">{meal.strMeal}</h3>
                    {meal.strMealThumb && (
                      <img 
                        src={meal.strMealThumb} 
                        alt={meal.strMeal} 
                        className="w-32 h-32 object-cover rounded my-2"
                      />
                    )}
                    <p><strong>Category:</strong> {meal.strCategory}</p>
                    <Link 
                      href={`/meal/${meal.idMeal}`}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
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