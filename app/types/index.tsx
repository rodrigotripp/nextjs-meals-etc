// Define Zod schemas for meal data
import { z } from 'zod';

export const MealType = {
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string().nullable().optional(),
  strArea: z.string().nullable().optional(),
  strInstructions: z.string().nullable().optional(),
  strMealThumb: z.string().nullable().optional(),
  strTags: z.string().nullable().optional()
};


export const MealSchema = z.object(MealType);