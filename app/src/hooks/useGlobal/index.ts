import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IGlobalStateType, IStateType } from './types';

const initData: IStateType = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL + '/api/v1',
  token: '',
  adminToken: '',
  user: null,
  permissions: [],
  collapsed: false,
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
      partialize: ({ token, adminToken, collapsed }) => ({
        token,
        adminToken,
        collapsed,
      }),
    },
  ),
);
