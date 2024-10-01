import axios from 'axios';

import { useTokenStore } from '@/states/token-store';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global request and response interceptors
client.interceptors.request.use((config) => {
  const accessToken = useTokenStore.getState().accessToken;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

client.interceptors.response.use((value) => {
  return value;
});
