import type { IPaginationType } from '@projectname/shared';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export type IMessageType = 'default' | null | string;

export interface IHttpResponse<IResponseType = any> {
  data: IResponseType;
  meta?: {
    pagination?: IPaginationType;
    message?: string;
  };
}

export type IUseHttpProps<IResponseType = any> = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  useAntdMessage?: boolean;
  showLoading?: boolean;
  success?: {
    message?: IMessageType;
    action?: (params: {
      data: IResponseType;
      response: AxiosResponse<IHttpResponse<IResponseType>>;
      pagination: IPaginationType;
    }) => void;
  };
  error?: {
    message?: IMessageType;
    action?: (params: {
      data: any;
      response: AxiosResponse<IHttpResponse<IResponseType>>;
      status: number;
    }) => void;
  };
};

export interface UseHttpState<IRequestType = any, IResponseType = any> {
  loading: boolean;
  errorMessage: string | null;
  data: IResponseType | null;
  fetchData: (overrideData?: IRequestType) => void;
  pagination: IPaginationType;
  status?: number;
}

export type IHttpGenerics = {
  request?: any;
  response?: any;
};

export type IHttpType<T extends IHttpGenerics = IHttpGenerics> = Omit<
  IUseHttpProps<T['response']>,
  'url' | 'method' | 'data'
> & {
  data?: T['request'];
};
