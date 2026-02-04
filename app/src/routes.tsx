import { Navigate } from 'react-router-dom';
import { Dashboard, Login, Product } from '@/pages';
import type { IRouteType } from '@/types';
import { LayoutDashboard, Package, Settings } from 'lucide-react';

const NotFound = () => {
  throw new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  });
};

export const routes: IRouteType[] = [
  {
    id: '/',
    path: '/',
    element: <Navigate to="/login" />,
    handle: {
      auth: false,
      layout: 'BASIC',
    },
  },
  {
    id: 'login',
    path: '/login',
    element: <Login />,
    handle: {
      auth: false,
      layout: 'BASIC',
    },
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    handle: {
      menu: {
        label: 'Dashboard',
        icon: <LayoutDashboard size={18} />,
      },
    },
  },
  {
    id: 'products',
    path: '/products',
    element: <Product />,
    handle: {
      menu: {
        label: 'Product',
        icon: <Package size={18} />,
      },
    },
  },
  {
    id: 'settings',
    path: '/settings',
    element: <Product />,
    handle: {
      menu: {
        position: 'BOTTOM',
        label: 'Settings',
        icon: <Settings size={18} />,
      },
    },
  },
  {
    id: 'not-found',
    path: '*',
    element: <NotFound />,
  },
];
