import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service';
import { JwtStrategy } from './strategies';
import { AuthController } from './controller';
import { getEnv } from '@/utils';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: getEnv('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
