import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';
import { Quest } from '@/requests/quest';

function QuestListItem({ quest }: { quest: Quest }) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/quest/${quest.id}`}
      key={quest.id}
      className="group block relative w-full h-[160px] overflow-hidden rounded-lg shadow-md"
    >
      <Image
        width={320}
        height={160}
        src={quest.content.thumbnailImage}
        alt={quest.title}
        className={cn([
          'w-full h-full object-cover absolute inset-0',
          'grayscale', // TODO: 임시 필터
          'group-hover:scale-110 transition-transform duration-300',
        ])}
      />
      <div className="relative z-10 bg-gradient-to-b from-black/0 via-black/60 to-black/80 w-full h-full flex flex-col justify-end p-4">
        <h2 className="text-white font-bold text-lg text-left drop-shadow-2xl">
          {quest.title}
        </h2>
      </div>
    </Link>
  );
}

export default React.memo(QuestListItem, (prev, next) => {
  return prev.quest.id === next.quest.id;
});
