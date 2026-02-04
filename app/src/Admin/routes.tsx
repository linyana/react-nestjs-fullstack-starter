import { Gauge } from 'lucide-react';
import type { IRouteType } from '@/types';
import { AdminLogin } from './pages';
import { AdminDashboard } from './pages/Dashboard';

export const adminRoutes: IRouteType[] = [
  {
    id: 'admin',
    path: '/admin',
    element: <AdminLogin />,
    handle: {
      auth: false,
      layout: 'BASIC',
    },
  },
  {
    id: 'admin/login',
    path: '/admin/login',
    element: <AdminLogin />,
    handle: {
      auth: false,
      layout: 'BASIC',
    },
  },
  {
    id: 'admin/dashboard',
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    handle: {
      role: ['Admin'],
      menu: {
        label: 'Dashboard',
        icon: <Gauge size={18} />,
      },
    },
  },
];
