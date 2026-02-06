import { Controller } from '@nestjs/common';
import { ShoplineService } from './service';

@Controller('shopline')
export class ShoplineController {
  constructor(private readonly shoplineService: ShoplineService) {}
}
