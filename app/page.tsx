import { createCaller } from './server';
import Counter from './components/Counter';

export default async function Home() {
  const caller = createCaller({ headers: new Headers() });

  const randomMeal = await caller.mealRouter.getRandomMeal();
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <p>
        <b>Hola</b>
      </p>
      <Counter />
      <p>{randomMeal.strCategory}</p>
    </div>
  );
}
