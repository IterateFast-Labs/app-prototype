import { Metadata } from 'next';

import { QuestList } from '@/features/quest/components/quest-list';

export default function QuestListPage() {
  return (
    <main>
      <QuestList />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Quests',
  description: 'Find and complete quests to earn rewards',
};
