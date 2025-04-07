import { MealSchema } from "../types"
import z from 'zod';
import Image from "next/image";
import Link from 'next/link';

type Meal = z.infer<typeof MealSchema> & {
  refetch: () => void;
}

function Meal(props: Meal) {
  const { strMeal, strMealThumb, strCategory, strArea, idMeal, refetch } = props;
  return (

    <div className="rounded-lg border p-4">
      <Link href={`/meal/${idMeal}`}>
        <h3 className="text-lg font-medium">{strMeal}</h3>
        {strMealThumb && (
          <Image
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
      <button
        onClick={() => refetch()}
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Get Another Random Meal
      </button>
    </div>
  )
}



export default Meal
