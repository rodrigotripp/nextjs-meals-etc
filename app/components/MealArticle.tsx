import { Meal } from '../types';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="flex flex-col justify-center px-4 text-gray-700 md:w-2/3">
          <h1 className="mb-2 text-2xl font-bold">{meal.strMeal}</h1>
          <div className="mb-2">
            <span>Categories: </span>
            {meal.strCategory && (
              <Link href={`/category/${meal.strCategory}`}>
                <span className="mb-2 mr-2 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold">
                  {meal.strCategory}
                </span>
              </Link>
            )}
            {meal.strArea && (
              <Link href={`/area/${meal.strArea}`}>
                <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold">
                  {meal.strArea}
                </span>
              </Link>
            )}
            <br />
            {meal.strTags ? <span>Tags: </span> : null}
            {meal.strTags &&
              meal.strTags.split(',').map((tag) => (
                <>
                  <span
                    key={tag.trim()}
                    className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold"
                  >
                    {tag.trim()}
                  </span>
                </>
              ))}
          </div>
          <h2 className="mb-2 text-xl font-semibold">Instructions</h2>
          <p className="mb-2">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}
