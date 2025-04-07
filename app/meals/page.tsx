// import { useEffect } from 'react';
// import { trpc } from '../_trpc/client';
import RandomMeal from '../components/RandomMeal';
import Search from '../components/Search';
// import { getLocation } from '@/app/utils/location'

export default function MealsPage() {
  // const {weatherRouter} = trpc;
  // const searchWeather = weatherRouter.searchCityWeather.useQuery({search: 'mexico'})
  // useEffect(()=> {
  //   getLocation();
  //   console.log(searchWeather.data)
  // });

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">TheMealDB Explorer</h1>
      <Search />
      <RandomMeal />
    </div>
  );
}
