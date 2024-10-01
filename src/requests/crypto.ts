import { useQuery } from '@tanstack/react-query';

import { client } from './config/axios-instance';

export async function getServerPubKey() {
  const { data } = await client.get<string>('/auth/server-pubkey');
  return data;
}

export function useGetServerPubKey() {
  return useQuery({
    queryKey: ['server-pubkey'],
    staleTime: Infinity,
    queryFn: getServerPubKey,
  });
}
