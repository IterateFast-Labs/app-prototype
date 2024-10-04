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

export async function getQuestDetail(id: string) {
  const { data } = await client.get<Quest>(`/quests/${id}`);
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
