'use client';

import { LoaderIcon } from 'lucide-react';
import { useDeferredValue, useState } from 'react';

import { ScreenContainer } from '@/components/layout/screen-layout';
import { cn } from '@/lib/utils';
import { useGetQuests } from '@/requests/quest';

import QuestFinder from './quest-finder';
import QuestListHeader from './quest-list-header';
import QuestListItem from './quest-list-item';
import QuestNoResult from './quest-no-result';

export function QuestList() {
  const [search, setSearch] = useState<string>('');
  const defferedSearch = useDeferredValue(search);
  const { data, isLoading } = useGetQuests({
    filter: {
      title: defferedSearch,
    },
  });

  return (
    <ScreenContainer className="min-h-svh flex flex-col pb-12">
      <QuestListHeader count={data?.count} />

      <div className="px-4">
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <QuestFinder onSearch={(value) => setSearch(value)} />
          </div>

          <div className="shrink-0 aspect-square flex justify-center items-center">
            <LoaderIcon
              className={cn([
                isLoading ? 'animate-spin opacity-100' : 'opacity-0',
                'text-gray-500',
              ])}
            />
          </div>
        </div>

        <div className="py-3 grid grid-cols-1 gap-3">
          {data?.count === 0 && <QuestNoResult search={search} />}
          {data?.list.map((quest) => (
            <QuestListItem quest={quest} key={quest.id} />
          ))}
        </div>
      </div>
    </ScreenContainer>
  );
}
