import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { StateStorage } from 'zustand/middleware';

export const cookiesStorage: StateStorage = {
  getItem: (name: string) => {
    return getCookie(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { expires: 1 });
  },
  removeItem: (name: string) => {
    removeCookie(name);
  },
};
