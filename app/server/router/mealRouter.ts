import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { MealSchema } from '@/app/types';

const api_url = process.env.MEALS_API_BASE_URL;

// Create meal router with procedures
export const mealRouter = router({
  // Get a random meal from TheMealDB
  getRandomMeal: publicProcedure.query(async () => {
    const response = await fetch(`${api_url}random.php`);
    const data = await response.json();
    return MealSchema.parse(data.meals[0]);
  }),

  // Search meals by name
  searchMeals: publicProcedure.input(z.object({ query: z.string() })).query(async ({ input }) => {
    const response = await fetch(`${api_url}search.php?s=${input.query}`);
    const data = await response.json();

    // If no meals found, return empty array
    if (!data.meals) return [];

    // Parse and validate each meal
    return z.array(MealSchema).parse(data.meals);
  }),

  // Get meal by ID
  getMealById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const response = await fetch(`${api_url}lookup.php?i=${input.id}`);
    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      throw new Error('Meal not found');
    }

    return MealSchema.parse(data.meals[0]);
  }),
});
