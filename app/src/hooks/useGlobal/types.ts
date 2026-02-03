import type { IPermissionType } from '@projectname/shared';

export type IStateType = {
  token: string;
  adminToken: string;
  apiBaseUrl: string;
  permissions: IPermissionType[];
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
