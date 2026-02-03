import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IRoleType } from '@projectname/shared';
import { IPayloadType } from 'src/common/decorators/types';
import { PrismaService } from 'src/common/services/prisma/service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let requiredRoles = this.reflector.getAllAndOverride<IRoleType[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (token) {
      if (!requiredRoles) {
        // requiredRoles = [ROLE.Staff];
      }
      const decoded: IPayloadType = this.jwtService.decode(token);
      if (decoded?.userId) {
        const user = await this.prisma.users.findUnique({
          where: {
            id: BigInt(decoded.userId),
          },
        });
        return user ? requiredRoles.includes('Staff') : false;
      }
    } else {
      return true;
    }
    return false;
  }
}
