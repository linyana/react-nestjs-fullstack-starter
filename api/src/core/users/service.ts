import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/service';
export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}
