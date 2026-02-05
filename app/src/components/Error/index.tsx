import { Result, Button, Space } from 'antd';
import { useNavigate, useRouteError } from 'react-router-dom';
import React from 'react';
import type { ResultStatusType } from 'antd/es/result';
import { Layout } from '@/providers';
import { useAuth } from '@/hooks';

interface ErrorResultProps {
  status: ResultStatusType;
  title: string;
  subTitle?: string;
  extra?: React.ReactNode;
}

export const Error: React.FC<ErrorResultProps> = ({ status, title, subTitle, extra }) => {
  const navigate = useNavigate();
  const { logout, loginUrl } = useAuth();

  return (
    <Layout.Centered>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          extra || (
            <Space orientation="horizontal" size="middle" wrap>
              <Button
                onClick={() => {
                  logout({
                    message: null,
                  });
                  navigate(loginUrl, {
                    replace: true,
                  });
                }}
              >
                Back To Login
              </Button>
              <Button type="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </Space>
          )
        }
      />
    </Layout.Centered>
  );
};

export const ErrorPage = ({ status, errorMessage }: { status: number; errorMessage?: string }) => {
  const navigate = useNavigate();
  const { logout, loginUrl } = useAuth();

  switch (status) {
    case 401:
      return (
        <Error
          status="403"
          title="Authentication Required"
          subTitle={errorMessage || 'Your session has expired. Please log in again.'}
          extra={
            <Button
              type="primary"
              onClick={() => {
                logout({
                  message: null,
                });
                navigate(loginUrl, {
                  replace: true,
                });
              }}
            >
              Log in to continue
            </Button>
          }
        />
      );
    case 403:
      return (
        <Error
          status="403"
          title="Access Denied"
          subTitle={errorMessage || "You don't have permission to access this page."}
        />
      );
    case 404:
      return (
        <Error
          status="404"
          title="Page Not Found"
          subTitle={errorMessage || 'The page you are looking for does not exist.'}
        />
      );
    default:
      return (
        <Error
          status="500"
          title="Error"
          subTitle={errorMessage || 'An unexpected error occurred. Please try again or contact us.'}
        />
      );
  }
};

export const RouteError: React.FC = () => {
  const error: any = useRouteError();
  const errorMessage = error.data || error.message || error.statusText;

  return <ErrorPage status={error.status} errorMessage={errorMessage} />;
};
