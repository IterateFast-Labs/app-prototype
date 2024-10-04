'use client';

import { Search } from 'lucide-react';
import { useDeferredValue, useState } from 'react';

import { ScreenContainer } from '@/components/layout/screen-layout';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useGetQuests } from '@/requests/quest';

export default function DashboardPage() {
  const [search, setSearch] = useState<string>('');
  const defferedSearch = useDeferredValue(search);
  const { data } = useGetQuests({
    filter: {
      title: defferedSearch,
    },
  });

  return (
    <main>
      <ScreenContainer className="min-h-svh flex flex-col pb-12">
        <header className="flex flex-col gap-2 py-8 px-4">
          <h1 className="text-xl font-extrabold">Quests</h1>
          <p className="text-sm text-gray-500">
            There are {data?.count} Quests listed
          </p>
        </header>

        <div className="px-4">
          <div className="relative">
            <label
              htmlFor="quest-search"
              className="absolute left-2 top-2 z-10"
            >
              <Search size={24} />
              <span className="sr-only">Search</span>
            </label>
            <Input
              id="quest-search"
              placeholder="Search Quests"
              className="pl-10"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-6 py-3">
            {data?.list.map((quest) => (
              <button
                key={quest.id}
                role="button"
                className="group relative w-full h-[160px] overflow-hidden rounded-lg shadow-md"
              >
                <img
                  loading="lazy"
                  src={quest.content.thumbnailImage}
                  alt={quest.title}
                  className={cn([
                    'w-full h-full object-cover absolute inset-0',
                    'grayscale', // TODO: 임시 필터
                    'group-hover:scale-110 transition-transform duration-300',
                  ])}
                />
                <div className="relative z-10 bg-gradient-to-b from-black/0 via-black/60 to-black/80 w-full h-full flex flex-col justify-end p-4">
                  <h2 className="text-white font-bold text-xl text-left drop-shadow-2xl">
                    {quest.title}
                  </h2>
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScreenContainer>
    </main>
  );
}
