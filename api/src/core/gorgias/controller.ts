import { Controller, Get, Query } from '@nestjs/common';
import { GorgiasService } from './service';

@Controller('gorgias')
export class GorgiasController {
  constructor(private readonly gorgiasService: GorgiasService) {}

  @Get('oauth')
  async oauth(@Query() query: any) {
    return this.gorgiasService.oauth(query);
  }
}
