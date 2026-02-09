import type { PERMISSION_TYPE } from '@projectname/shared';

export const selectPermission = (permission: PERMISSION_TYPE) => permission;
export const hasPermission = (currentPermission: PERMISSION_TYPE, permission: PERMISSION_TYPE) =>
  currentPermission === permission;

export const hasAnyPermission = (
  currentPermissions: PERMISSION_TYPE[],
  permissions: PERMISSION_TYPE[] = [],
) => {
  if (!permissions?.length) return true;
  const currentPermissionTypes = new Set(currentPermissions);
  return permissions.some((permission) => currentPermissionTypes.has(permission));
};

export const hasAllPermissions = (
  currentPermissions: PERMISSION_TYPE[],
  permissions: PERMISSION_TYPE[] = [],
) => {
  if (!permissions?.length) return true;
  const currentPermissionTypes = new Set(currentPermissions);
  return permissions.every((permission) => currentPermissionTypes.has(permission));
};
