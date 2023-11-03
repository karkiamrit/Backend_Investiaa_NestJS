import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './inputs/auth.input';
import { JwtWithUser } from '../auth/entities/auth._entity';
import { UseGuards } from '@nestjs/common';
import { SignInGuard } from '../modules/guards/graphql-signin-guard';
import { OtpType } from '../otp/entities/otp.entity';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import { GraphqlPassportAuthGuard } from 'src/modules/guards/graphql-passport-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async SignUp(@Args('input') input: SignUpInput): Promise<User> {
    return await this.authService.signUp(input);
  }

  @Mutation(() => JwtWithUser)
  @UseGuards(SignInGuard)
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
  // @UseGuards(new GraphqlPassportAuthGuard())
  async logout(
    @CurrentUser() user: User,
    @Args('accessToken') accessToken: string,
  ): Promise<boolean> {
    const success = await this.authService.logout(user, accessToken);
    return success;
  }
}
