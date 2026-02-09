import { MiddlewareConsumer, Module, NestModule, Type } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { PrismaModule, CacheModule, HttpModule } from './common';
import { RolesGuard } from './common/guards';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { JwtAuthGuard } from './core/auth/guards';
import { getEnv, UtilModule } from './utils';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';

import * as Modules from './core';

const modules = Object.values(Modules) as Type<any>[];

@Module({
  imports: [
    UtilModule,
    PrismaModule,
    CacheModule,
    HttpModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: getEnv('REDIS_HOST'),
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...modules,
  ],
  providers: [
    JwtService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: 'REDIS_SUB_CLIENT',
      useValue: new Redis({
        host: getEnv('REDIS_HOST'),
        port: 6379,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
