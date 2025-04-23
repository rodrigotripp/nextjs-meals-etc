import Link from 'next/link';

interface LinkPillProps {
  type: 'category' | 'area' | 'ingridient';
  string: string;
  color?: '#b36e88' | '#edd6df' | '#eb7777' | '#c9e7db' | '#fae1b4' | '#c6e4e7' | string;
}

function LinkPill({ string, color, type }: LinkPillProps) {
  const colors = ['#b36e88', '#edd6df', '#eb7777', '#c9e7db', '#fae1b4', '#c6e4e7'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  const pillColor = color || randomColor;
  if (string === null || undefined) return;
  return (
    <Link href={`/${type}/${string}`}>
      <span
        className={`mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold`}
        style={{ backgroundColor: pillColor }}
      >
        {string}
      </span>
    </Link>
  );
}

export default LinkPill;
