import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    const accessToken = this.jwtService.sign({ userId: user.id.toString() });
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
    const user = await this.prisma.adminUsers.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (!user) {
      throw new UnauthorizedException("Can't find this user, please try again.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({ userId: user.id.toString() });
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
