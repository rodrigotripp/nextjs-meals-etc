import Link from 'next/link';
import { PillColor } from '../MealArticle';

interface LinkPillProps {
  type: 'category' | 'area' | 'ingridient';
  string: string;
  color?: PillColor;
}

function LinkPill({ string, color, type }: LinkPillProps) {
  const colorCheck = color ? color : 'red';
  return (
    <Link href={`/${type}/${string}`}>
      <span
        className={`mb-2 mr-2 inline-block rounded-full bg-${colorCheck}-200 px-3 py-1 text-sm font-semibold`}
      >
        {string}
      </span>
    </Link>
  );
}

export default LinkPill;
