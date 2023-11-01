import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { TokenService } from 'src/token/token.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CustomJwtStrategy extends PassportStrategy(
  Strategy,
  'custom-jwt',
) {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    console.log('here');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_PUBLIC_KEY'),
    });
  }
  async validate(payload: any, done: VerifiedCallback) {
    console.log('hello');
    const data = await this.tokenService.resolveRefreshToken(payload.token);
    const userData = data.user;
    if (!userData) {
      // If the token is invalid or user is not found, throw UnauthorizedException
      throw new UnauthorizedException('Invalid token');
    }
    done(null, userData);
  }
}
