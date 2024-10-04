'use client';

import { LinkIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { ScreenContainer } from '@/components/layout/screen-layout';
import QuestContent from '@/features/quest/components/quest-content';
import { useGetQuestDetail } from '@/requests/quest';

export default function QuestDetailPage() {
  const router = useRouter();
  const locale = useLocale();
  const questId = useParams().id;

  if (!questId) {
    router.push(`/${locale}/quests`);
    return null;
  }

  const { data, isLoading } = useGetQuestDetail(String(questId));

  return (
    <main>
      <ScreenContainer className="min-h-svh flex flex-col pb-12">
        <article className="flex flex-col gap-2">
          <div className="aspect-video bg-gray-200">
            <img
              className="object-cover w-full h-full"
              src={data?.content.image}
              alt={data?.title}
            />
          </div>

          <div className="p-4 flex flex-col gap-2">
            <header>
              <h1 className="text-xl font-bold">{data?.title}</h1>
            </header>

            <QuestContent text={data?.content.description} />

            <ul className="flex items-center gap-3">
              {data?.content.externals.map((external, index) => (
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
          </div>
        </article>
      </ScreenContainer>
    </main>
  );
}
