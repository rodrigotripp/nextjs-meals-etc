import { router, publicProcedure } from './trpc';
import { mealRouter } from './router/mealRouter';
import { weatherRouter } from './router/weatherRouter';

export const appRouter = router({
  mealRouter,
  weatherRouter,
});
export type AppRouter = typeof appRouter;
