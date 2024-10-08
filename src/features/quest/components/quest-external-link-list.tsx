import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Quest } from '@/requests/quest';

export function QuestExternalListList({
  list,
  className,
}: {
  list: Quest['content']['externals'];
  className?: string;
}) {
  return (
    <ul className={cn(['flex items-center gap-3', className])}>
      {list.map((external) => (
        <li key={external.type}>
          {external.type === 'website' && (
            <Link
              href={external.url}
              rel="noopener noreferrer"
              className="flex space-x-1 items-center"
              target="_blank"
            >
              <LinkIcon size={16} />
              <span className="sr-only">Website</span>
            </Link>
          )}
          {external.type === 'twitter' && (
            <Link
              href={external.url}
              rel="noopener noreferrer"
              className="flex space-x-1 items-center"
              target="_blank"
            >
              <span className="block aspect-square text-center w-4 font-bold text-xl">
                𝕏
              </span>
              <span className="sr-only">twitter</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
