import { useMutation, useQuery } from '@tanstack/react-query';

import { useTokenStore } from '@/states/token-store';

import { client } from './config/axios-instance';

export interface UserDetail {
  id: string;
  nickname: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}

export async function getUser() {
  const { data } = await client.get<UserDetail>('/user');

  return data;
}

export function useGetUser() {
  const accessToken = useTokenStore().accessToken;
  return useQuery({
    queryKey: ['user', accessToken],
    queryFn: getUser,
    enabled: !!accessToken,
  });
}

export async function getProfile() {
  const { data } = await client.get<void>('/profile');

  return data;
}

export function useGetProfile() {
  const accessToken = useTokenStore().accessToken;
  return useQuery({
    queryKey: ['profile', accessToken],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
}

export interface UpdateProfileBody {
  interests: string[];
  nickname: string;
}

export async function updateProfile(payload: UpdateProfileBody) {
  const { data } = await client.patch('/user/profile', payload);

  return data;
}

export function useUpdateProfile() {
  return useMutation({
    mutationKey: ['profile'],
    mutationFn: (payload: UpdateProfileBody) => updateProfile(payload),
  });
}
