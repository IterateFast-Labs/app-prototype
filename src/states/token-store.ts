import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { cookiesStorage } from './storage/cookie-storage';

export interface TokenStore {
  accessToken: string | null;
  setAccessToken(accessToken: string | null): void;
  resetAccessToken(): void;
}

export const useTokenStore = create(
  persist<TokenStore>(
    (set, get) => ({
      accessToken: null,
      setAccessToken(accessToken: string | null) {
        return set({ accessToken });
      },
      resetAccessToken() {
        return set({ accessToken: null });
      },
    }),
    {
      name: 'token-store',
      storage: createJSONStorage(() => cookiesStorage),
    },
  ),
);
