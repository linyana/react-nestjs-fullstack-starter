import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@/common/services/prisma/service';
import { getEnv } from '@/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getEnv('JWT_SECRET_KEY'),
    } as any);
  }

  async validate(payload: { userId: string }) {
    const user = await this.prisma.users.findUnique({
      where: { id: BigInt(payload.userId) },
    });

    if (!user) {
      throw new UnauthorizedException("Can't find this user, please try again.");
    }

    return {
      userId: user.id,
      role: user.role,
    };
  }
}
