import { Meal } from '@/app/types';

export interface ingridients {
  ingredient: string;
  measure: string;
}

export const getIngredients = (meal: Meal) => {
  const ingredients: ingridients[] = [];
  for (let i = 1; i <= 20; i++) {
    const key = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    if (key in meal && meal[key] !== '') {
      ingredients.push({
        ingredient: typeof meal[key] === 'string' ? (meal[key] as string) : '',
        measure: typeof meal[measureKey] === 'string' ? (meal[measureKey] as string) : '',
      });
    }
  }
  return ingredients;
};
