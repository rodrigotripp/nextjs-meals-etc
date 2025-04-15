import { createCaller } from './server';

export default async function Home() {
  const caller = createCaller({ headers: new Headers() });

  const randomMeal = await caller.mealRouter.getRandomMeal();
  const pastaMeals = await caller.mealRouter.getMealByCategory({ category: 'Pasta' });
  console.log(pastaMeals);
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <p>
        <b>Hola</b>
      </p>
      <p>{randomMeal.strCategory}</p>
    </div>
  );
}
