// Define Zod schemas for meal data
import { z } from 'zod';

export const MealType = {
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string().nullable().optional(),
  strArea: z.string().nullable().optional(),
  strInstructions: z.string().nullable().optional(),
  strMealThumb: z.string().nullable().optional(),
  strTags: z.string().nullable().optional(),
};
export type Meal = z.infer<typeof MealSchema> & {
  refetch?: () => void;
};
export const MealSchema = z.object(MealType);

export const CityType = {
  clouds: z.object({ all: z.number() }),
  coord: z.object({ lat: z.number(), lon: z.number() }),
  dt: z.number(),
  id: z.number(),
  rain: z.string().nullish(),
  snow: z.string().nullish(),
  name: z.string(),
  weather: z.array(
    z.object({
      id: z.number(), // Weather condition id
      main: z.string(), // Grupo de condiciones (Rain, Snow, etc)
      description: z.string(), // Descripción dentro del grupo
      icon: z.string(), // ID del ícono
    }),
  ),
  main: z.object({
    temp: z.number(), // Temperatura
    feels_like: z.number(), // Sensación térmica
    pressure: z.number(), // Presión atmosférica al nivel del mar
    humidity: z.number(), // Humedad %
    temp_min: z.number(), // Temp. mínima observada
    temp_max: z.number(), // Temp. máxima observada
    sea_level: z.number().optional(), // Presión al nivel del mar (opcional)
    grnd_level: z.number().optional(), // Presión al nivel del suelo (opcional)
  }),
  visibility: z.number(),
  wind: z.object({
    speed: z.number(), // Velocidad del viento
    deg: z.number(), // Dirección del viento
    gust: z.number().optional(), // Ráfaga (opcional)
  }),
  sys: z.object({
    type: z.number().optional(), // Interno
    id: z.number().optional(), // Interno
    message: z.number().optional(), // Interno
    country: z.string(), // Código de país
    sunrise: z.number().optional(), // Amanecer
    sunset: z.number().optional(), // Atardecer
  }),
};

export const WeatherApiResponse = z.object({
  cod: z.string(),
  count: z.number(),
  list: z.array(z.object(CityType)),
  message: z.string(),
});
