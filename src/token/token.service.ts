import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async addToBlacklist(tokenIdentifier: string): Promise<void> {
    await this.tokenRepository.addToBlacklist(tokenIdentifier);
  }

  async isTokenBlacklisted(tokenIdentifier: string): Promise<boolean> {
    return this.tokenRepository.isTokenBlacklisted(tokenIdentifier);
  }
}