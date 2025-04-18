import MealListPage from '@/app/components/MealListPage';
export default function Area({ params }: { params: { id: string } }) {
  const { id } = params;
  return <MealListPage argString={id} type="area" />;
}
