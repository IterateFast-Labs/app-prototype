'use server';

import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import Image from 'next/image';

import { SubpageNav } from '@/components/layout/navbar';
import { ScreenContainer } from '@/components/layout/screen-layout';
import { SubpageBackLink } from '@/components/subpage-back-button';
import QuestContent from '@/features/quest/components/quest-content';
import { QuestExternalListList } from '@/features/quest/components/quest-external-link-list';
import { getQuestDetailServerSide } from '@/requests/quest';

export default async function QuestDetailPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const data = await getQuestDetailServerSide(id);
  const locale = await getLocale();

  return (
    <>
      <main>
        <ScreenContainer>
          <SubpageNav
            left={<SubpageBackLink href={`/${locale}/quest`} />}
            right={<></>}
          />
          <article className="flex flex-col gap-2 -mt-10">
            <div className="w-full relative aspect-video bg-gray-200">
              {data?.content.image && (
                <Image
                  loading="eager"
                  width={320}
                  height={160}
                  className="absolute inset-0 object-cover object-center w-full h-full"
                  src={data?.content.image}
                  alt={data?.title}
                />
              )}
            </div>

            <div className="p-4 flex flex-col gap-2">
              <header>
                <h1 className="text-xl font-bold">{data?.title}</h1>
              </header>

              <QuestContent text={data?.content.description} />

              <QuestExternalListList list={data?.content.externals} />
            </div>
          </article>
        </ScreenContainer>
      </main>
    </>
  );
}

export async function generateMetadata({
  params: { id },
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const data = await getQuestDetailServerSide(id);

  return {
    title: data.title,
    description: data.content.description,
  };
}
