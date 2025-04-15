import Link from 'next/link';
import MealArticle from '@/app/components/MealArticle';
import { createCaller } from '@/app/server';

export default async function MealDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const caller = createCaller({ headers: new Headers() });
  const mealQuery = await caller.mealRouter.getMealById({ id });

  if (!id) {
    return <div className="container mx-auto p-4">Invalid meal ID</div>;
  }

  const meal = mealQuery;
  if (!meal) return null;
  return (
    <div className="container mx-auto">
      <Link href="/meals" className="mb-4 block text-blue-500 hover:underline">
        &larr; Back to meal list
      </Link>
      <MealArticle {...meal} />
    </div>
  );
}
