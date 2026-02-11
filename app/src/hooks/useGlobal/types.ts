import type { PERMISSION_TYPE, ROLE_TYPE } from '@projectname/shared';

export type IStateType = {
  token: string;
  adminToken: string;
  apiBaseUrl: string;
  permissions: PERMISSION_TYPE[];
  role: ROLE_TYPE;
  collapsed: boolean;
  user: {
    name: string;
    email: string;
  } | null;
};

export type IStateActionsType = {
  set: (state: Partial<IStateType>) => void;
  reset: (state?: Partial<IStateType>) => void;
};

export type IGlobalStateType = IStateType & {
  actions: IStateActionsType;
};
