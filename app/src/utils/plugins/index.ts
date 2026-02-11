import type { ROLE_TYPE } from '@projectname/shared';

export const selectRole = (role: ROLE_TYPE) => role;
export const hasRole = (currentRole: ROLE_TYPE, role: ROLE_TYPE) => currentRole === role;
export const hasAnyRole = (role: ROLE_TYPE, roles: ROLE_TYPE[] = []) =>
  roles?.length ? roles.includes(role) : true;
