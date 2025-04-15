'use client';

import { useParams } from 'next/navigation';
import { trpc } from '../../_trpc/client';
import Link from 'next/link';
import MealArticle from '@/app/components/MealArticle';

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const mealQuery = trpc.mealRouter.getMealById.useQuery(
    { id },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    },
  );

  if (!id) {
    return <div className="container mx-auto p-4">Invalid meal ID</div>;
  }

  if (mealQuery.isLoading) {
    return <div className="container mx-auto p-4">Loading meal details...</div>;
  }

  if (mealQuery.error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {mealQuery.error.message}</div>
    );
  }
  const meal = mealQuery.data;
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
