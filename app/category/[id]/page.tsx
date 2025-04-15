import MealListPage from '@/app/components/MealListPage';
export default function Category({ params }: { params: { id: string } }) {
  console.log('PARAMS',params)
  const { id } = params;
  return <MealListPage type="category" argString={id} />;
}
