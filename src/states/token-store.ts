import { jwtDecode } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface TokenStore {
  accessToken: string | null;
  setAccessToken(accessToken: string | null): void;
  resetAccessToken(): void;
}

interface ParsedStoredValue<T> {
  state: T;
  version: number;
}

export const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
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
      storage: createJSONStorage(() => ({
        getItem(name) {
          return getCookie(name) ?? null;
        },
        setItem(name, value) {
          const parsedValue = JSON.parse(
            value,
          ) as ParsedStoredValue<TokenStore>;

          const savedAccessToken = parsedValue.state.accessToken;

          if (!savedAccessToken) {
            return;
          }

          const decoded = jwtDecode(savedAccessToken);

          if (!decoded.exp) {
            return;
          }

          const expiratedDate = new Date(decoded.exp * 1000);

          setCookie(name, value, {
            expires: expiratedDate, // cookie will expire at the same time as the token
            path: '/', // cookie will be accessible on all pages of the site
            secure: true, // cookie will only be sent over HTTPS
            sameSite: 'strict', // cookie will only be sent on the same site
          });
        },
        removeItem(name) {
          removeCookie(name);
        },
      })),
    },
  ),
);
