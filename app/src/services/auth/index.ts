import { useHttp } from '@/hooks';
import type { IHttpGenerics, IHttpType } from '@/hooks/types';
import type { ILoginRequestType, ILoginResponseType } from '@projectname/shared';

export const useAuth = <T extends IHttpGenerics>(params?: IHttpType<T>) =>
  useHttp<T>({
    url: '/auth',
    method: 'get',
    ...params,
  });

export const useLogin = <
  T extends IHttpGenerics = {
    request: ILoginRequestType;
    response: ILoginResponseType;
  },
>(
  params: IHttpType<T>,
) =>
  useHttp<T>({
    url: '/auth/sessions',
    method: 'post',
    ...params,
  });

export const useAdminLogin = <
  T extends IHttpGenerics = {
    request: ILoginRequestType;
    response: ILoginResponseType;
  },
>(
  params: IHttpType<T>,
) =>
  useHttp<T>({
    url: '/auth/admin/sessions',
    method: 'post',
    ...params,
  });
