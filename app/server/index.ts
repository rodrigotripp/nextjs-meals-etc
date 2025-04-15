import { router, createCallerFactory } from './trpc';
import { mealRouter } from './router/mealRouter';
import { weatherRouter } from './router/weatherRouter';

export const appRouter = router({
  mealRouter,
  weatherRouter,
});
export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
