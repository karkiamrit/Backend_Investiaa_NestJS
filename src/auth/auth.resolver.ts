import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './inputs/auth.input';
import { JwtWithUser } from '../auth/entities/auth._entity';
import { UseGuards } from '@nestjs/common';
import { SignInGuard } from 'src/modules/guards/graphql-signin-guard';
import { CurrentQuery } from '../modules/decorators/query.decorator';
import { OtpType } from 'src/otp/entities/otp.entity';
import { User } from 'src/user/entities/user.entity';
import { TokenService } from '../token/token.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) { }

  @Mutation(() => User)
  async SignUp(@Args('input') input: SignUpInput): Promise<User> {
    return await this.authService.signUp(input);
  }

  @Mutation(() => String)
  async refresh(@Args('refreshToken') refreshToken: string): Promise<string> {
    return await this.tokenService.createAccessTokenFromRefreshToken(
      refreshToken,
    );
  }

  @Mutation(() => JwtWithUser)
  async signIn(@Args('input') input: SignInInput): Promise<JwtWithUser> {
    const result = await this.authService.signIn(input);
    return result;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    const result = await this.authService.forgotPassword(email);
    return result;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<boolean> {
    const result = await this.authService.resetPassword(token, newPassword);
    return result;
  }

  @Mutation(() => Boolean)
  async requestOtpVerify(
    @Args('phone') phone: string,
    @Args('otpType') otpType: OtpType,
  ): Promise<boolean> {
    return await this.authService.requestOtpVerify(phone, otpType);
  }

  @Mutation(() => Boolean)
  async verifyPhone(
    @Args('phone') phone: string,
    @Args('otpCode') otpCode: string,
  ): Promise<boolean> {
    const result = await this.authService.verifyPhone(phone, otpCode);
    return result;
  }

  @Mutation(() => Boolean)
  logout(
    @CurrentQuery() query: User,
    @Args('refreshToken') refreshToken: string,
    @Args('fromAll') fromAll: boolean,
  ): Promise<boolean> {
    return fromAll
      ? this.authService.logoutFromAll(query)
      : this.authService.logout(query, refreshToken);
  }
}
