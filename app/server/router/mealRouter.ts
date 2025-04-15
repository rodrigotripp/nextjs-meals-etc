import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { Meal, MealSchema } from '@/app/types';

const api_url = process.env.MEALS_API_BASE_URL;

// Create meal router with procedures
export const mealRouter = router({
  getRandomMeal: publicProcedure.query(async (): Promise<Meal> => {
    const response = await fetch(`${api_url}random.php`);
    const data = await response.json();
    return MealSchema.parse(data.meals[0]);
  }),
  searchMeals: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }): Promise<Meal[]> => {
      const response = await fetch(`${api_url}search.php?s=${input.query}`);
      const data = await response.json();
      if (!data.meals) return [];
      return z.array(MealSchema).parse(data.meals);
    }),
  getMealById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }): Promise<Meal> => {
      const response = await fetch(`${api_url}lookup.php?i=${input.id}`);
      const data = await response.json();
      const { meals } = data;
      if (!meals || meals.length === 0) {
        throw new Error('Meal not found');
      }
      return meals[0];
    }),
  getMealByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }): Promise<Meal[]> => {
      const response = await fetch(`${api_url}filter.php?c=${input.category}`);
      const data = await response.json();
      const { meals } = data;
      if (!meals || meals.length === 0) {
        throw new Error('Meal not found');
      }
      return meals;
    }),
  getMealsByArea: publicProcedure
    .input(z.object({ area: z.string() }))
    .query(async ({ input }): Promise<Meal[]> => {
      const response = await fetch(`${api_url}filter.php?a=${input.area}`);
      const data = await response.json();
      const { meals } = data;
      if (!meals || meals.length === 0) {
        throw new Error('Meal not found');
      }
      return meals;
    }),
});
