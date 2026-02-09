/* eslint-disable @typescript-eslint/no-empty-function */
import { useRef, useState } from 'react';
import axios, { type AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';
import { useAuth, useGlobal, useMessage } from '@/hooks';
import type { IHttpGenerics, IHttpResponse, IUseHttpProps, UseHttpState } from './types';

const handleHttpError = (
  error: any,
  httpStrategy?: Record<number, () => void>,
): { message: string; code: number } => {
  const status = error?.response?.status;
  const errorMap: Record<number, string> = {
    500: 'Internal server error.',
    502: 'System upgrade in progress. Please try again later.',
    504: 'Timed out',
  };

  const errorMessage =
    errorMap[status] ||
    error?.response?.data?.meta?.message ||
    error?.message ||
    'An unknown error occurred.';

  if (httpStrategy?.[status]) httpStrategy[status]();

  return {
    message: errorMessage,
    code: status || 0,
  };
};

const defaultPagination = {
  totalCount: 0,
  offset: 0,
  limit: 0,
  current: 0,
};

/**
 * useHttp hook
 * @param url Request URL
 * @param method HTTP method (default 'get')
 * @param data Request body
 * @param params Request parameters
 * @param headers Custom headers
 * @param success Success callback configuration
 *   - message: default success message;
 *       - for GET requests: null (no message shown)
 *       - for other requests: 'default' (message taken from response data if available)
 *   - action: optional callback executed after a successful request, receives { data, response, pagination }
 * @param error Error callback configuration
 *   - message: default error message; 'default' uses the message extracted from the HTTP error
 *   - action: optional callback executed after a failed request, receives { data: null, response }
 */
export const useHttp = <T extends IHttpGenerics = IHttpGenerics>({
  url,
  method = 'get',
  data,
  params,
  headers,
  success = {},
  error = {},
  showLoading,
  useAntdMessage,
}: IUseHttpProps<T['response']>) => {
  type IRequestType = T['request'];
  type IResponseType = T['response'];

  const { apiBaseUrl } = useGlobal();
  const { token } = useAuth();
  const message = useMessage();

  // default message config
  const isGet = !method || method === 'get';
  if (showLoading === undefined) {
    showLoading = !isGet;
  }
  if (success.message === undefined) {
    success.message = isGet ? null : 'default';
  }
  if (error.message === undefined) {
    error.message = 'default';
  }

  const latestRequestId = useRef(0);

  const [state, setState] = useState<UseHttpState<IRequestType, IResponseType>>({
    loading: false,
    data: null,
    errorMessage: null,
    pagination: defaultPagination,
    fetchData: () => {},
    status: undefined,
  });

  const fetchData = async (overwriteBody?: { data?: IRequestType; params?: IRequestType }) => {
    const loadingKey = nanoid();
    if (showLoading) {
      if (useAntdMessage) {
        message.loading({
          content: 'Loading...',
          key: loadingKey,
        });
      } else {
        console.warn('showLoading only can use with antd, please set useAntdMessage to true.');
      }
    }

    const { data: overwriteData, params: overwriteParams } = overwriteBody || {};

    latestRequestId.current += 1;
    const requestId = latestRequestId.current;

    try {
      setState((prev) => ({
        ...prev,
        loading: true,
      }));

      const response: AxiosResponse<IHttpResponse<IResponseType>> = await axios({
        url: `${apiBaseUrl}${url}`,
        method,
        data: overwriteData || data,
        params: overwriteParams || params,
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (requestId !== latestRequestId.current) return;

      const responseData = response.data;

      setState({
        data: responseData.data,
        errorMessage: null,
        loading: false,
        fetchData,
        pagination: responseData.meta?.pagination ?? defaultPagination,
        status: 200,
      });

      if (success.message) {
        const isDefault = success.message === 'default';
        const responseMessage =
          typeof responseData.data === 'string' ? responseData.data : 'Successfully';
        const finalMessage = isDefault ? responseMessage : success.message;
        message.success({
          key: loadingKey,
          content: finalMessage,
        });
      } else if (showLoading) message.dismiss(loadingKey);

      success.action?.({
        data: responseData.data,
        response,
        pagination: responseData.meta?.pagination ?? {
          totalCount: 0,
          offset: 0,
          limit: 0,
          current: 0,
        },
      });
    } catch (err: any) {
      if (requestId !== latestRequestId.current) return;

      const { message: errorMessage } = handleHttpError(err);

      setState({
        data: null,
        errorMessage,
        loading: false,
        fetchData,
        pagination: defaultPagination,
        status: err?.response?.status || 400,
      });

      if (error.message) {
        message.error({
          key: loadingKey,
          content: error.message === 'default' ? errorMessage : error.message,
        });
      } else if (showLoading) message.dismiss(loadingKey);

      error.action?.({
        data: null,
        response: err?.response,
        status: err?.response?.status || 400,
      });
    }
  };

  return {
    ...state,
    fetchData,
  };
};
