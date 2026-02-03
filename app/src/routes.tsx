import { Navigate } from 'react-router-dom';
import { Dashboard, Login } from '@/pages';
import type { IRouteType } from '@/types';
import { LayoutDashboard } from 'lucide-react';

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
    id: 'not-found',
    path: '*',
    element: <NotFound />,
  },
];
