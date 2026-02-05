import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from 'src/common/services/prisma/service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
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
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '3d' },
    );

    const refreshToken = this.jwtService.sign(
      { userId: user.id.toString() },
      { secret: process.env.JWT_REFRESH_SECRET_KEY, expiresIn: '7d' },
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

  async adminLogin(email: string, password: string) {
    const adminUser = await this.prisma.adminUsers.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!adminUser) {
      throw new UnauthorizedException("Can't find this user, please try again.");
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign(
      { adminUserId: adminUser.id.toString() },
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '3d' },
    );

    const refreshToken = this.jwtService.sign(
      { adminUserId: adminUser.id.toString() },
      { secret: process.env.JWT_REFRESH_SECRET_KEY, expiresIn: '7d' },
    );

    this.prisma.adminUsers
      .update({
        where: { id: adminUser.id },
        data: { lastLoginAt: new Date() },
      })
      .catch(() => null);

    return {
      accessToken,
      refreshToken,
      user: {
        name: adminUser.name,
        email: adminUser.email,
      },
    };
  }

  async auth(params: { userId: bigint; adminUserId: bigint }) {
    const { userId, adminUserId } = params;

    if (adminUserId) {
      const adminUser = await this.prisma.adminUsers.findUnique({
        where: {
          id: adminUserId,
        },
      });

      if (!adminUser) {
        throw new NotFoundException('Admin user not found');
      }

      return {
        user: {
          name: adminUser.name,
          email: adminUser.email,
        },
      };
    }

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
