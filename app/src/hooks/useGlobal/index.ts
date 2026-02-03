import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IGlobalStateType, IStateType } from './types';

const initData: IStateType = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  token: '',
  adminToken: '',
  user: null,
  permissions: [],
};

export const useGlobal = create<IGlobalStateType>()(
  persist(
    (set) => ({
      ...initData,

      actions: {
        set,
        reset: (state) =>
          set({
            ...initData,
            ...state,
          }),
      },
    }),
    // Persistent configuration(localStorage)
    {
      name: 'projectname',
      partialize: ({ token }) => ({
        token,
      }),
    },
  ),
);
