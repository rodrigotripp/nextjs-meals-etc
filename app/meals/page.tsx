// import { useEffect } from 'react';
// import { trpc } from '../_trpc/client';
// import RandomMeal from '../components/RandomMeal';
import Categories from '../components/Categories';
import Search from '../components/Search';
import { lazy, Suspense } from 'react';
// import { getLocation } from '@/app/utils/location'

const LazyRandom = lazy(() => import('@/app/components/RandomMeal'));

export default function MealsPage() {
  // const {weatherRouter} = trpc;
  // const searchWeather = weatherRouter.searchCityWeather.useQuery({search: 'mexico'})
  // useEffect(()=> {
  //   getLocation();
  //   console.log(searchWeather.data)
  // });

  return (
    <div className="container mx-auto p-4">
      <Categories />
      <Search />

      <Suspense fallback={<div>Check</div>}>
        <LazyRandom />
      </Suspense>
    </div>
  );
}
