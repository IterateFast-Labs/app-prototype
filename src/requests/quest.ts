import { useQuery } from '@tanstack/react-query';

import { useTokenStore } from '@/states/token-store';
import { ListResponseWithCount } from '@/types/list-response';

import { client } from './config/axios-instance';

export interface QuestListParams {
  filter?: {
    title: string;
  };
}

export interface Quest {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: {
    thumbnailImage: string;
    image: string;
    description: string;
    externals: {
      type: 'website' | 'twitter' | 'discord' | 'telegram';
      url: string;
    }[];
  };
  startDate: string | null;
  endDate: string | null;
}

export enum TaskType {
  SOCIAL_X = 'SOCIAL_X',
  VISIT_WEBSITE = 'VISIT_WEBSITE',
  API = 'API',
  ON_CHAIN = 'ON_CHAIN', // TBD
}

export interface Task {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: TaskType;
  questId: string;
  title: string;
  content: Record<string, unknown>;
  contentType: string;
  rewardPoint: number;
}

export async function getQuests(params?: QuestListParams) {
  const { data } = await client.get<ListResponseWithCount<Quest>>('/quests', {
    params,
  });
  return data;
}

export function useGetQuests(params?: QuestListParams) {
  const accessToken = useTokenStore().accessToken;
  return useQuery({
    queryKey: ['quest', 'list', accessToken, params],
    queryFn: () => getQuests(params),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
}

// client-side
export async function getQuestDetail(id: string) {
  const { data } = await client.get<
    Quest & {
      tasks: Task[];
    }
  >(`/quests/${id}`);
  return data;
}

// server-side (using fetch, no-need-to-authenticated)
export async function getQuestDetailServerSide(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quests/${id}`,
    {
      next: {
        // 10 minutes
        revalidate: 1000 * 60 * 10,
        tags: ['quest', id],
      },
    },
  );

  const data = (await response.json()) as Quest & {
    tasks: Task[];
  };

  return data;
}

export function useGetQuestDetail(id: string) {
  const accessToken = useTokenStore().accessToken;
  return useQuery({
    queryKey: ['quest', 'detail', id, accessToken],
    queryFn: () => getQuestDetail(id),
    enabled: !!accessToken,
  });
}
