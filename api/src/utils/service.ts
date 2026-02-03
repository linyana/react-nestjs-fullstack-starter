import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  constructor() {}

  async sleep(milliseconds: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
