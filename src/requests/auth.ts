import { useMutation } from '@tanstack/react-query';

import { client } from './config/axios-instance';

export interface LoginBody {
  walletAddress: `0x${string}`;
  signature: `0x${string}`;
}

export async function login(payload: LoginBody) {
  const { data } = await client.patch<{
    accessToken: string;
    isSignUp: boolean;
  }>('/auth/login', payload);

  return data;
}

export interface CreateNonceBody {
  walletAddress: `0x${string}`;
}

export async function createNonce(payload: CreateNonceBody) {
  const { data } = await client.post<{
    value: string;
    message: string;
  }>('/auth/nonce', payload);

  return data;
}

export function useLogin() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginBody) => login(payload),
  });
}
