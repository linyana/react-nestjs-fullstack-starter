import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLE_TYPE, ROLE } from '@projectname/shared';
import { IPayloadType } from '@/common/decorators/types';
import { PrismaService } from '@/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let requiredRoles = this.reflector.getAllAndOverride<ROLE_TYPE[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]) || [ROLE.Staff];

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return false;
    }

    const decoded: IPayloadType = this.jwtService.decode(token);

    if (decoded?.userId) {
      const user = await this.prisma.users.findUnique({
        where: {
          id: BigInt(decoded.userId),
        },
      });
      return user ? requiredRoles.includes(ROLE.Staff) : false;
    }
  }
}
