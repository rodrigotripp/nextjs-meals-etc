import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

// Define Zod schemas for meal data
const MealSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string().nullable().optional(),
  strArea: z.string().nullable().optional(),
  strInstructions: z.string().nullable().optional(),
  strMealThumb: z.string().nullable().optional(),
  strTags: z.string().nullable().optional(),
});

// Create meal router with procedures
export const mealRouter = router({
  // Get a random meal from TheMealDB
  getRandomMeal: publicProcedure.query(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return MealSchema.parse(data.meals[0]);
  }),

  // Search meals by name
  searchMeals: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.query}`);
      const data = await response.json();
      
      // If no meals found, return empty array
      if (!data.meals) return [];
      
      // Parse and validate each meal
      return z.array(MealSchema).parse(data.meals);
    }),

  // Get meal by ID
  getMealById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${input.id}`);
      const data = await response.json();
      
      if (!data.meals || data.meals.length === 0) {
        throw new Error('Meal not found');
      }
      
      return MealSchema.parse(data.meals[0]);
    }),
});