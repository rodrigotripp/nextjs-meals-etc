import MealListPage from '@/app/ui/components/MealListPage';
export default function Category({ params }: { params: { id: string } }) {
  const { id } = params;
  return <MealListPage type="category" argString={id} />;
}
