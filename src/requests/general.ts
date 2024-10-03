import { useQuery } from '@tanstack/react-query';

import { client } from './config/axios-instance';

export async function getInterests() {
  const { data } = await client.get<{
    interests: { name: string }[];
  }>('/general/interests');

  return data;
}

export function useGetInterests() {
  return useQuery({
    queryKey: ['interests'],
    queryFn: getInterests,
  });
}
