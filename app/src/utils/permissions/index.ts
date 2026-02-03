import type { IPermissionType } from '@projectname/shared';

export const selectPermission = (permission: IPermissionType) => permission;
export const hasPermission = (currentPermission: IPermissionType, permission: IPermissionType) =>
  currentPermission === permission;

export const hasAnyPermission = (
  currentPermissions: IPermissionType[],
  permissions: IPermissionType[] = [],
) => {
  if (!permissions?.length) return true;
  const currentPermissionTypes = new Set(currentPermissions);
  return permissions.some((permission) => currentPermissionTypes.has(permission));
};

export const hasAllPermissions = (
  currentPermissions: IPermissionType[],
  permissions: IPermissionType[] = [],
) => {
  if (!permissions?.length) return true;
  const currentPermissionTypes = new Set(currentPermissions);
  return permissions.every((permission) => currentPermissionTypes.has(permission));
};
