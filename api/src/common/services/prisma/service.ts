import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/../prisma/generated/client';
import { getEnv } from '@/utils';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: getEnv('DATABASE_URL'),
    });
    super({ adapter });
  }

  async safeUpsert<Model>(params: {
    model: Model;
    where: ExtractWhere<Model>;
    update: ExtractUpdate<Model>;
    create: ExtractCreate<Model>;
  }): Promise<ExtractResult<Model>> {
    const { where, update, create } = params;
    const { model }: any = params;

    const existing = await model.findUnique({
      where,
    });

    if (existing) {
      return model.update({
        where,
        data: update,
      });
    }

    return model.create({
      data: create,
    });
  }
}
