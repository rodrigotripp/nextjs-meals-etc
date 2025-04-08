import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { WeatherApiResponse } from '@/app/types';

const api_url = process.env.WEATHER_URL;
const apiId = process.env.WEATHER_APP_ID;

export const weatherRouter = router({
  searchCityWeather: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ input }) => {
      const { search } = input;
      const response = await fetch(`${api_url}find?appid=${apiId}&q=${search}`);
      const data: z.infer<typeof WeatherApiResponse> = await response.json();
      return data.list;
    }),
  weatherByLatLon: publicProcedure
    .input(z.object({ lat: z.string(), lon: z.string() }))
    .query(async ({ input }) => {
      const { lat, lon } = input;
      const response = await fetch(`${api_url}weather?lat=${lat}&lon=${lon}&appid=${apiId}`);
      const data: z.infer<typeof WeatherApiResponse> = await response.json();
      return data.list;
    }),
});
