import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from 'src/utils';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: env('REDIS_HOST'),
      port: 6379,
    });
  }
  
  private getRandomTTLSeconds(): number {
    const min = 16 * 60 * 60;
    const max = 32 * 60 * 60;
    return Math.floor(Math.random() * (max - min) + min);
  }

  private stringifyWithBigInt(obj: any): string {
    return JSON.stringify(obj, (_, val) => (typeof val === 'bigint' ? Number(val) : val));
  }

  private async get<T>(key: string, fallback: () => Promise<T>): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached !== null) {
      return JSON.parse(cached) as T;
    }

    const value = await fallback();
    return value;
  }

  private async set<T>(key: string, value: T): Promise<void> {
    const ttl = this.getRandomTTLSeconds();
    await this.redis.set(key, this.stringifyWithBigInt(value), 'EX', ttl);
  }

  private async setData<T>(params: {
    key: string;
    value: T;
    ttl?: number;
  }): Promise<void> {
    const { key, value, ttl = 10 * 60 } = params;
    const serialized = JSON.stringify(value);
    await this.redis.set(key, serialized, 'EX', ttl);
  }

  private async getData(params: {
    key: string
  }): Promise<string | null> {
    const { key } = params;
    const value = await this.redis.get(key);
    return value;
  }

  private async deleteData(params: {
    key: string
  }): Promise<void> {
    const { key } = params;
    await this.redis.del(key);
  }

  data = {
    get: async <T = unknown>(params: { key: string }) => {
      const res = await this.getData(params);
      return res ? (JSON.parse(res) as T) : null;
    },
    set: (params: {
      key: string;
      value: any;
      ttl?: number;
    }) => this.setData(params),
    delete: (params: { key: string }) => this.deleteData(params),
    remember: async <T>(params: {
      key: string
      ttl?: number
      resolver: () => Promise<T>
    }): Promise<T> => {
      const cached = await this.data.get<T>({ key: params.key })
      if (cached !== null) return cached

      const value = await params.resolver()

      const ttl = params.ttl ?? (10 * 60 + Math.floor(Math.random() * 10 * 60))

      await this.data.set({
        key: params.key,
        value,
        ttl,
      })

      return value
    },
  };
}
