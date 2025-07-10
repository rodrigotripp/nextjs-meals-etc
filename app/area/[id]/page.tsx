import MealListPage from '@/app/ui/components/MealListPage';
import { PageProps } from '@/app/types';

export default async function Area({ params }: PageProps) {
  const { id } = await params;
  return <MealListPage argString={id} type="area" />;
}
