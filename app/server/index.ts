import { router, publicProcedure } from './trpc';
import { mealRouter } from './router/mealRouter';

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [1, 2, 3];
  }),
  meal: mealRouter,
});
export type AppRouter = typeof appRouter;
