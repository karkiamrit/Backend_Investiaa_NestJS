import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { OtpService } from 'src/otp/otp.service';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get('JWT_PRIVATE_KEY'),
        publicKey: configService.get('JWT_PUBLIC_KEY'),
        signOptions: {
          // algorithm: 'RS256',
          expiresIn: '1d',
        },
        // verifyOptions: {
        //   algorithms: ['RS256'],
        // },
      }),
    }),
    ConfigModule,
    UserModule,
    OtpModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, LocalStrategy, OtpService],
})
export class AuthModule { }
