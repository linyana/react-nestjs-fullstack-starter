import { Module } from '@nestjs/common';
import { GorgiasController } from './controller';
import { GorgiasService } from './service';

@Module({
  controllers: [GorgiasController],
  providers: [GorgiasService],
  exports: [GorgiasService],
})
export class GorgiasModule {}
