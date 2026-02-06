import { Injectable } from '@nestjs/common';
import { PrismaService, CacheService } from '@/common';

@Injectable()
export class ShoplineService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
  ) {}
}
