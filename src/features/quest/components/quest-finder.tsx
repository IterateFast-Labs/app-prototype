'use client';

import { Search } from 'lucide-react';
import React from 'react';

import { Input } from '@/components/ui/input';

function QuestFinder({ onSearch }: { onSearch?: (search: string) => void }) {
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(debouncedSearch);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedSearch]);

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearch(e.target.value);
  };

  const FinderIcon = React.memo(() => (
    <label htmlFor="quest-search" className="absolute left-2 top-2 z-10">
      <Search size={24} />
      <span className="sr-only">Search</span>
    </label>
  ));

  return (
    <div className="relative">
      {<FinderIcon />}
      <Input
        id="quest-search"
        placeholder="Search Quests"
        className="pl-10"
        onChange={(e) => handleOnSearch(e)}
      />
    </div>
  );
}

export default React.memo(QuestFinder, () => true);
