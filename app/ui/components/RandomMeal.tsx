import Meal from './Meal';
import { caller } from '../../server/trpc/caller';
export default async function RandomMeal() {
  const randomMeal = await caller.mealRouter.getRandomMeal();

  return (
    <div className="my-4">
      <h2 className="mb-4 text-xl font-semibold">Random Meal</h2>
      {randomMeal ? (
        <Meal {...randomMeal} idMeal={randomMeal.idMeal} strMeal={randomMeal.strMeal} />
      ) : null}
    </div>
  );
}
