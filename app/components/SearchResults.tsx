import { Meal } from '../types';
import Image from 'next/image';
import Link from 'next/link';
export default function SearchResults(meal: Meal) {
  return (
    <div key={meal.idMeal} className="rounded-lg border p-4">
      <h3 className="text-lg font-medium">{meal.strMeal}</h3>
      {meal.strMealThumb && (
        <Image
          priority={true}
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="my-2 h-32 w-32 rounded object-cover"
          width={400}
          height={400}
        />
      )}
      <p>
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <Link
        href={`/meal/${meal.idMeal}`}
        className="mt-2 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}
