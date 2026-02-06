import { BadRequestException, Controller, Get, Query, Res } from '@nestjs/common';
import { GorgiasService } from './service';
import { Response } from 'express';
import { Public } from '@/common/decorators';

@Controller('gorgias')
export class GorgiasController {
  constructor(private readonly gorgiasService: GorgiasService) {}

  @Public()
  @Get('oauth/login')
  async oauth(@Query('account') account: string, @Res() res: Response) {
    return this.gorgiasService.oauth({
      account,
      res,
    });
  }

  @Public()
  @Get('oauth/callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('account') account: string,
  ) {
    if (!code) {
      throw new BadRequestException('Missing code');
    }

    return this.gorgiasService.exchangeToken({ code, state, account });
  }

  @Public()
  @Get('orders')
  async getOrders() {
    return this.gorgiasService.getOrders();
  }
}
