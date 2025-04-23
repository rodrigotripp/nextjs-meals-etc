import Image from 'next/image';
import Link from 'next/link';
import { Meal as MealType } from '../../types';

function Meal(props: MealType) {
  const { strMeal, strMealThumb, strCategory, strArea, idMeal, refetch } = props;
  return (
    <div className="flex flex-row justify-start gap-44 rounded-lg border p-4">
      <div className="flex flex-col justify-around p-4">
        <Link href={`/meal/${idMeal}`}>
          <h3 className="text-lg font-medium">{strMeal}</h3>
          {strMealThumb && (
            <Image
              priority={true}
              src={strMealThumb}
              alt={strMeal}
              className="my-2 h-48 w-48 rounded object-cover"
              width={400}
              height={400}
            />
          )}
          <p>
            <strong>Category:</strong> {strCategory}
          </p>
          <p>
            <strong>Origin:</strong> {strArea}
          </p>
          <p>
            <strong>ID:{idMeal}</strong>
          </p>
        </Link>
        {refetch && (
          <button
            onClick={() => refetch()}
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Get Another Random Meal
          </button>
        )}
      </div>
      <div className="hidden max-w-xl items-center text-justify lg:flex">
        <p>{props.strInstructions}</p>
      </div>
    </div>
  );
}

export default Meal;
