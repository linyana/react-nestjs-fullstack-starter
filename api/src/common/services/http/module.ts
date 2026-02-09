import { Global, Module } from '@nestjs/common';
import { HttpService } from './service';
import { AiHttpService } from './services/ai/service';

@Global()
@Module({
  providers: [HttpService, AiHttpService],
  exports: [HttpService],
})
export class HttpModule {}
