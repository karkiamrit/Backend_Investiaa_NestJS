import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/modules/redis/redis.service';
// import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async blacklistToken(
    tokenIdentifier: string,
    expirationInSeconds: number,
  ): Promise<void> {
    const client = this.redisService.getClient();
    await client.set(tokenIdentifier, 'blacklisted', 'EX', expirationInSeconds);
  }

  async isTokenBlacklisted(tokenIdentifier: string): Promise<boolean> {
    const client = this.redisService.getClient();
    const result = await client.get(tokenIdentifier);
    return result === 'blacklisted';
  }
  // async addToBlacklist(tokenIdentifier: string): Promise<void> {
  //   await this.tokenRepository.addToBlacklist(tokenIdentifier);
  // }

  // async isTokenBlacklisted(tokenIdentifier: string): Promise<boolean> {
  //   return this.tokenRepository.isTokenBlacklisted(tokenIdentifier);
  // }
}
