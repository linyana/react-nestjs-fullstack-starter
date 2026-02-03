import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let requiredRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [
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
        requiredRoles = [ROLE.Owner, ROLE.Staff];
      }
      const decoded: any = this.jwtService.decode(token);
      if (decoded?.userId) {
        const user = await this.prisma.users.findUnique({
          where: {
            id: Number(decoded.userId),
          },
        });
        return user ? requiredRoles.includes(user.role) : false;
      }
    } else {
      return true;
    }
    return false;
  }
}
