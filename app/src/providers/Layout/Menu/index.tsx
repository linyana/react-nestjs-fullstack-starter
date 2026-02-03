import { theme } from 'antd';
import { LayoutRouteMenu } from './RouteMenu';
import type { IRouteType } from '@/types';

export const LayoutMenu: React.FC<{ routes: IRouteType[] }> = ({ routes }) => (
  <LayoutRouteMenu position="TOP" routes={routes} />
);

export const LayoutBottomMenu: React.FC<{ routes: IRouteType[] }> = ({ routes }) => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken();
  const border = `1px solid ${colorBorderSecondary}`;

  return (
    <LayoutRouteMenu
      position="BOTTOM"
      style={{
        borderTop: border,
      }}
      routes={routes}
    />
  );
};
