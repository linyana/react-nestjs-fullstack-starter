import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common';
export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}
