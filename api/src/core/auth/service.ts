import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from '@/common';
import { getEnv } from '@/utils';
import { ROLE } from '@projectname/shared';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(params: { email: string; password: string; isAdmin?: boolean }) {
    const { email, password, isAdmin } = params;

    const user = await this.prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
        role: isAdmin ? ROLE.Admin : ROLE.Staff,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Can't find this user, please try again.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id.toString() },
      { secret: getEnv('JWT_SECRET_KEY'), expiresIn: '3d' },
    );

    const refreshToken = this.jwtService.sign(
      { userId: user.id.toString() },
      { secret: getEnv('JWT_REFRESH_SECRET_KEY'), expiresIn: '7d' },
    );

    this.prisma.users
      .update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })
      .catch(() => null);

    return {
      accessToken,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  async auth(params: { userId: bigint }) {
    const { userId } = params;

    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
