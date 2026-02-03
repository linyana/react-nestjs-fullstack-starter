import { MiddlewareConsumer, Module, NestModule, Type } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { PrismaModule } from './common';
import { RolesGuard } from './common/guards';
import * as Modules from './core';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { JwtAuthGuard } from './core/auth/guards';
import { UtilModule } from './utils';

const modules = Object.values(Modules) as Type<any>[];

@Module({
  imports: [
    UtilModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
