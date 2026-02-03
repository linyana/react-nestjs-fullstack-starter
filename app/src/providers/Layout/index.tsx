import { Outlet, useMatches } from 'react-router-dom';
import type { ILayoutType, IRouteType } from '@/types';
import { Layout } from './Layouts';
import { AuthProvider } from '../Auth';

export * from './Layouts';

export const LayoutProvider: React.FC<{ routes: IRouteType[] }> = ({ routes }) => {
  const matches = useMatches();
  const route = matches[matches.length - 1] as IRouteType;

  if (!route) {
    return null;
  }
  const layoutMode = route?.handle?.layout as ILayoutType;

  const layoutObject = {
    BLANK: Layout.Blank,
    CENTERED: Layout.Centered,
    DEFAULT: Layout.Default,
    BASIC: Layout.Basic,
  };

  const LayoutComponent = layoutObject[layoutMode] || Layout.Default;

  return (
    <div className="admin">
      <AuthProvider route={route}>
        <LayoutComponent routes={routes}>
          <Outlet />
        </LayoutComponent>
      </AuthProvider>
    </div>
  );
};
