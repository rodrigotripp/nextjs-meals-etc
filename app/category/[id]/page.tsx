'use client'

import { useParams } from 'next/navigation';
import { trpc } from '../../_trpc/client';
import SearchResults from '@/app/components/SearchResults';

export default function Category() {
  const { mealRouter } = trpc;
  const params = useParams();
  const category = params.id as string;
  const meals = mealRouter.getMealByCategory.useQuery({ category }, { enabled: !!category, refetchOnWindowFocus: false })
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{
      meals.data?.map((meal) => (
        <SearchResults key={meal.idMeal} {...meal} />
      ))
    }</div>
  )
}
