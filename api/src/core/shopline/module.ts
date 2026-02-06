import { Module } from '@nestjs/common';
import { ShoplineController } from './controller';
import { ShoplineService } from './service';

@Module({
  controllers: [ShoplineController],
  providers: [ShoplineService],
  exports: [ShoplineService],
})
export class ShoplineModule {}
