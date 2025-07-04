// import { useEffect } from 'react';
// import { trpc } from '../_trpc/client';
// import RandomMeal from '../components/RandomMeal';
import Search from '../ui/components/Search';
import { lazy, Suspense } from 'react';
// import { getLocation } from '@/app/utils/location'

const LazyRandom = lazy(() => import('@/app/ui/components/RandomMeal'));
const LazyCategories = lazy(() => import('@/app/ui/components/Categories'));


export default function MealsPage() {
  // const {weatherRouter} = trpc;
  // const searchWeather = weatherRouter.searchCityWeather.useQuery({search: 'mexico'})
  // useEffect(()=> {
  //   getLocation();
  //   console.log(searchWeather.data)
  // });

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Check</div>}>
        <LazyCategories />
      </Suspense>
      <Search />
      <Suspense fallback={<div>Check</div>}>
        <LazyRandom />
      </Suspense>
    </div>
  );
}
