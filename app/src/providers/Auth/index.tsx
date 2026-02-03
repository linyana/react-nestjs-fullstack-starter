import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import type { IRouteType } from '@/types';
import { useAdmin, useGlobal } from '@/hooks';
import { useAuth } from '@/services';
import { Layout } from '../Layout';
import { ErrorPage } from '@/components';
import { Spin } from 'antd';

export const AuthProvider: React.FC<{
  route: IRouteType;
  children: React.ReactNode;
}> = ({ route, children }) => {
  const [status, setStatus] = useState<'waiting' | 'error' | 'complete'>('waiting');
  const { actions, user } = useGlobal();
  const { logout, token, loginUrl, dashboardUrl } = useAdmin();
  const navigate = useNavigate();
  const needAuth = route?.handle?.auth;

  const {
    fetchData,
    errorMessage,
    status: statusCode,
  } = useAuth({
    error: {
      action: ({ status }) => {
        setStatus('error');
        if (!needAuth || status === 401) logout({ message: null });
      },
    },
    success: {
      action: ({ data }) => {
        actions.set({ permissions: data.permissions || [], user: data.user });
        setStatus('complete');
      },
    },
  });

  useEffect(() => {
    if (token) {
      fetchData();
      setStatus('waiting');
    } else {
      setStatus('complete');
    }
  }, [token]);

  useEffect(() => {
    if (!token && needAuth) {
      navigate(loginUrl, { replace: true });
    } else if (user && !needAuth) {
      navigate(dashboardUrl, { replace: true });
    }
  }, [token, user, needAuth]);

  if (status === 'waiting' || (!token && needAuth) || (user && !needAuth))
    return (
      <Layout.Centered>
        <Spin />
      </Layout.Centered>
    );

  if (status === 'error' && statusCode && errorMessage)
    return <ErrorPage status={statusCode} errorMessage={errorMessage} />;

  return <>{children}</>;
};
