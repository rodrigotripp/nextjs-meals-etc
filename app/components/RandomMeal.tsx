import { trpc } from '../_trpc/client';
const {mealRouter} = trpc;
import Meal from '../components/Meal';

export default function RandomMeal() {
  //tRPC hooks to fetch data
  const randomMeal = mealRouter.getRandomMeal.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const {isLoading, error, data, refetch} = randomMeal;
  return (
        <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Random Meal</h2>
        {isLoading ? (
          <p>Loading random meal...</p>
        ) : error ? (
          <p className="text-red-500">Error loading meal: {error.message}</p>
        ) : data ? (
          <Meal 
            {...data}
            idMeal={data.idMeal} 
            strMeal={data.strMeal}
            refetch={refetch} 
            />
        ) : null}
      </div>
  )
}
