import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';
// import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  private readonly redisClient: Redis.Redis;
  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get('REDIS_HOST');
    const port = this.configService.get('REDIS_PORT');
    const password = this.configService.get('REDIS_PASSWORD');
    this.redisClient = new Redis.default({
      host: host,
      port: port,
      password: password,
      lazyConnect: true,
      keepAlive: 1000,
    });
  }

  async blacklistToken(
    tokenIdentifier: string,
    expirationInSeconds: number,
  ): Promise<void> {
    await this.redisClient.set(
      tokenIdentifier,
      'blacklisted',
      'EX',
      expirationInSeconds,
    );
  }

  async isTokenBlacklisted(tokenIdentifier: string): Promise<boolean> {
    const result = await this.redisClient.get(tokenIdentifier);

    return result === 'blacklisted';
  }
  // async addToBlacklist(tokenIdentifier: string): Promise<void> {
  //   await this.tokenRepository.addToBlacklist(tokenIdentifier);
  // }

  // async isTokenBlacklisted(tokenIdentifier: string): Promise<boolean> {
  //   return this.tokenRepository.isTokenBlacklisted(tokenIdentifier);
  // }
}
