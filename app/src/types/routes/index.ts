import type { PERMISSION_TYPE, ROLE_TYPE } from '@projectname/shared';
import type { RouteObject } from 'react-router-dom';

export type ILayoutType = 'DEFAULT' | 'BLANK' | 'CENTERED' | 'BASIC';
export type IMenuPositionType = 'TOP' | 'BOTTOM';

export type IMenuType = {
  position?: IMenuPositionType;
  label?: React.ReactNode;
  icon?: React.ReactNode;
};

export type IRouteType = Omit<RouteObject, 'children' | 'handle' | 'id'> & {
  id: string;
  handle?: {
    menu?: IMenuType;
    layout?: ILayoutType;
    auth?: boolean;
    permissions?: PERMISSION_TYPE[];
    role?: ROLE_TYPE[];
  };
  children?: IRouteType[];
};
