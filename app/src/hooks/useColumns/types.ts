import type { PERMISSION_TYPE, ROLE_TYPE } from '@projectname/shared';
import type { ColumnType } from 'antd/es/table';

export type IColumnType<T> = ColumnType<T> & {
  permissions?: PERMISSION_TYPE[];
  roles?: ROLE_TYPE[];
};

export type IColumnsType<T> = IColumnType<T>[];
