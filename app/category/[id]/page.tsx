import MealListPage from '@/app/ui/components/MealListPage';
import { PageProps } from '@/app/types';

export default async function Category({ params }: PageProps) {
  const { id } = await params;
  return <MealListPage type="category" argString={id} />;
}
