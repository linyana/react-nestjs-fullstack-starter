import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AiHttpService } from './services/ai/service';
import { PLATFORM, PLATFORM_TYPE } from '@projectname/shared';
import { BaseHttpService } from './services/base.service';
import { IHttpRequestType } from './types';

@Injectable()
export class HttpService {
  constructor(
    private aiHttpService: AiHttpService,
  ) {}

  async getService(platform: PLATFORM_TYPE) {
    const serviceMap: { [key in PLATFORM_TYPE]: BaseHttpService } = {
      [PLATFORM.AI]: this.aiHttpService,
    };

    return {
      service: serviceMap[platform],
    };
  }

  async request<T>({
    method,
    platform,
    url,
    data,
    params,
    headers,
    needHandleError = true,
  }: IHttpRequestType): Promise<T | any> {
    const { service } = await this.getService(platform);
    const newHeaders = await service.getHeaders();

    let apiUrl = url;
    if (!apiUrl.startsWith('http')) {
      apiUrl = await service.getUrl({ url });
    }

    const axiosConfig: AxiosRequestConfig = {
      method,
      url: apiUrl,
      params,
      headers: {
        ...newHeaders,
        ...headers,
      },
      data,
    };
    if (needHandleError) {
      try {
        const response: AxiosResponse<T> = await axios(axiosConfig);
        return response.data;
      } catch (error: any) {
        if (['ECONNABORTED', 'ECONNREFUSED'].includes(error.code)) {
          throw new BadRequestException(`Request timeout`);
        }
        await service.handleError({ error: error });
      }
    } else {
      const response: AxiosResponse<T> = await axios(axiosConfig);
      return response.data;
    }
  }
}
