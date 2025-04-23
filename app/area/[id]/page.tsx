import MealListPage from '@/app/ui/components/MealListPage';
export default function Area({ params }: { params: { id: string } }) {
  const { id } = params;
  return <MealListPage argString={id} type="area" />;
}
