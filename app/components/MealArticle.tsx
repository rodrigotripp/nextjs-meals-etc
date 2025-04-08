import { Meal } from '../types';
import Image from 'next/image';

export default function MealArticle(meal: Meal) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="md:flex">
        <div className="self-center md:w-1/3">
          {meal.strMealThumb && (
            <Image
              width={400}
              height={400}
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="h-auto w-full object-cover"
            />
          )}
        </div>
        <div className="px-4 md:w-2/3">
          <h1 className="mb-2 text-2xl font-bold">{meal.strMeal}</h1>
          <div className="mb-2">
            {meal.strCategory && (
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                {meal.strCategory}
              </span>
            )}
            {meal.strArea && (
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                {meal.strArea}
              </span>
            )}
            {meal.strTags &&
              meal.strTags.split(',').map((tag) => (
                <span
                  key={tag.trim()}
                  className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>

          <h2 className="mb-2 text-xl font-semibold">Instructions</h2>
          <p className="mb-2 text-gray-700">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}
