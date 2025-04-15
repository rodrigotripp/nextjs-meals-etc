import { Meal } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { getIngredients } from '@/app/_utils/parseIngredients';

export default function MealArticle(meal: Meal) {
  const ingredients = getIngredients(meal);
  return (
    <div className="overflow-hidden rounded-lg bg-white pb-4 shadow-lg">
      <div className="md:flex">
        <div className="self-start md:w-1/3">
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
        <div className="flex flex-col justify-center gap-2 px-4 text-gray-700 md:w-2/3">
          <h1 className="mb-2 text-2xl font-bold">{meal.strMeal}</h1>
          <div>
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
                    key={tag}
                    className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold"
                  >
                    {tag.trim()}
                  </span>
                </>
              ))}
          </div>
          <div>
            <h2 className="my-2 text-xl font-semibold">Ingredients</h2>
            <ul>
              {ingredients.map((item, index) => {
                return item.ingredient ? (
                  <li key={`${item.ingredient}_${index}`} className="grid grid-cols-2 py-1">
                    <span className="font-medium">{item.ingredient}</span>
                    <span className="text-gray-600">{item.measure}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
          <div>
            <h2 className="my-1 text-xl font-semibold">Instructions</h2>
            <p className="text-justify">{meal.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
