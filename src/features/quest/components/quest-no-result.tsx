import React from 'react';

function QuestNoResult({ search }: { search: string }) {
  return (
    <div className="py-10 px-2 bg-gray-50 rounded-lg">
      <p className="text-center text-gray-500 text-sm text-balance">
        No quests found with the search term{' '}
        <span>
          "{search.substring(0, 5)}
          {search.length > 5 ? '...' : ''}"
        </span>
      </p>
    </div>
  );
}

export default React.memo(QuestNoResult, (prev, next) => {
  return prev.search.substring(0, 5) === next.search.substring(0, 5);
});
