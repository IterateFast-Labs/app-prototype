import React from 'react';

function QuestListHeader({ count }: { count?: number }) {
  return (
    <header className="flex flex-col gap-2 py-8 px-4">
      <h1 className="text-xl font-extrabold">Quests</h1>
      <p className="text-sm text-gray-500">
        {count !== undefined && (
          <span className="text-sm text-x`gray-500 whitespace-break-spaces">
            There are {count > 0 ? count : 'no'} Quest
            {count > 1 ? <span>s</span> : null}
          </span>
        )}
        {count === undefined && 'Loading quests...'}
      </p>
    </header>
  );
}

export default React.memo(QuestListHeader, (prev, next) => {
  return prev.count === next.count;
});
