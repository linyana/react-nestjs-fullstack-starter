import { Global, Module } from '@nestjs/common';
import { UtilService } from './service';

@Global()
@Module({
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilModule {}
