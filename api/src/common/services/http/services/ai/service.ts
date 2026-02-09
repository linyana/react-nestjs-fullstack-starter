import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseHttpService } from '../base.service';

@Injectable()
export class AiHttpService extends BaseHttpService {
  constructor() {
    super();
  }

  async getHeaders() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer xxx',
    };
  }

  async getUrl(params: { url: string }) {
    const { url } = params;
    return url;
  }

  async handleError(params: { error: any }) {
    const { error } = params;
    throw new BadRequestException({
      status: error.response?.status || 400,
      message: error.response?.data?.message || error.message || 'Unknown Error',
    });
  }
}
