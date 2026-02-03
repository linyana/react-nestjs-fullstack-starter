import { Global, Module } from '@nestjs/common';
import { CacheService } from './service';

@Global()
@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
