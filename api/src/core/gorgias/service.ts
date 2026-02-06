import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Response } from 'express';
import axios from 'axios';
import { PrismaService } from 'src/common/services/prisma/service';
import { env } from 'src/utils';
import { CacheService } from 'src/common';

@Injectable()
export class GorgiasService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
  ) {}

  async oauth({ account, res }: { account: string; res: Response }) {
    const redirectUri = encodeURIComponent(
      `${env('BASE_URL')}/api/v1/gorgias/oauth/callback?account=${account}`,
    );

    const state = randomBytes(16).toString('hex');
    await this.cacheService.data.set({ key: state, value: state });

    const authorizeUrl =
      `https://${account}.gorgias.com/oauth/authorize` +
      `?response_type=code` +
      `&client_id=${env('GORGIAS_CLIENT_ID')}` +
      `&scope=openid+email+profile+offline+write:all` +
      `&redirect_uri=${redirectUri}` +
      `&state=${state}`;

    res.redirect(authorizeUrl);
  }

  async exchangeToken({ code, state, account }: { code: string; state: string; account: string }) {
    const cachedState = await this.cacheService.data.get({ key: state });
    if (!state || !cachedState) {
      throw new BadRequestException('Invalid state');
    }

    const clientId = env('GORGIAS_CLIENT_ID');
    const clientSecret = env('GORGIAS_CLIENT_SECRET');
    const baseUrl = env('BASE_URL') + '/api/v1';

    if (!clientId || !clientSecret || !baseUrl) {
      throw new BadRequestException('Missing Gorgias OAuth env config');
    }

    const tokenUrl = `https://${account}.gorgias.com/oauth/token`;

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${baseUrl}/gorgias/oauth/callback?account=${account}`,
    });

    try {
      const { data } = await axios.post(tokenUrl, body.toString(), {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // await this.prisma.gorgiasToken.upsert({
      //   where: {
      //     account,
      //   },
      //   update: {
      //     access_token: data.access_token,
      //     refresh_token: data.refresh_token,
      //     scope: data.scope,
      //   },
      //   create: {
      //     account,
      //     access_token: data.access_token,
      //     refresh_token: data.refresh_token,
      //     scope: data.scope,
      //   },
      // });

      console.log(data);

      return {
        token: data.access_token,
      };
    } catch (error: any) {
      const message = error?.response?.data || error?.message || 'Unknown error';

      throw new BadRequestException(`Gorgias token exchange failed: ${message}`);
    }
  }

  getOrders() {
    return [
      {
        id: 1,
        order_number: '00001',
        account: 'test',
        status: 'open',
        total: 100,
      },
      {
        id: 2,
        order_number: '00002',
        account: 'test',
        status: 'open',
        total: 100,
      },
    ];
  }
}
