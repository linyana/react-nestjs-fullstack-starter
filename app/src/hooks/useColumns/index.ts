import {
  hasAllPermissions,
  hasAnyRole,
} from '@/utils'
import type {
  IColumnsType,
} from './types'
import {
  useGlobal,
} from '@/hooks'

export const useColumns = <T>({
  columns,
}: {
  columns: IColumnsType<T>,
}) => {
  const global = useGlobal()

  const {
    permissions = [],
    role = 'Staff',
  } = global

  return columns.filter((column) => (
    hasAllPermissions(permissions, column.permissions || [])
      && hasAnyRole(role, column.roles || [])
  ))
}
