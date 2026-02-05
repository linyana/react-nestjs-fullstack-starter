import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/service';

@Injectable()
export class GorgiasService {
  constructor(private prisma: PrismaService) {}

  async oauth(body: any) {
    console.log(body);
  }
}
