import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ROLE } from '@projectname/shared';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@/common/services/prisma/service';
import { env } from '@/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env('JWT_SECRET_KEY'),
    } as any);
  }

  async validate(payload: { userId: string; adminUserId: string }) {
    if (payload.adminUserId) {
      const adminUser = await this.prisma.users.findUnique({
        where: { id: BigInt(payload.adminUserId) },
      });

      if (!adminUser) {
        throw new UnauthorizedException("Can't find this user, please try again.");
      }

      return {
        adminUserId: adminUser.id,
        role: ROLE.Admin,
      };
    }

    const user = await this.prisma.users.findUnique({
      where: { id: BigInt(payload.userId) },
    });

    if (!user) {
      throw new UnauthorizedException("Can't find this user, please try again.");
    }

    return {
      userId: user.id,
      role: ROLE.Staff,
    };
  }
}
