import { ingridients } from "@/app/_utils/parseIngredients"
interface IngredientListProps {
  ingredients: ingridients[]
}

export const IngredientList = (
  {ingredients}: IngredientListProps) => {
  return (
    <>
      <ul className='w-96'>
        {ingredients.map((item, index) => {
          return item.ingredient ? (
            <li key={`${item.ingredient}_${index}`} className={`grid grid-cols-2 py-1 ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-50'}`}>
              <span className="font-medium">{item.ingredient}</span>
              <span className="text-gray-600">{item.measure}</span>
            </li>
          ) : null;
        })}
      </ul>
    </>
  )
}