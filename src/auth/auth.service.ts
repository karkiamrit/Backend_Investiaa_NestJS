import { UserService } from '../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInInput, SignUpInput } from 'src/auth/inputs/auth.input';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash';
import { User } from 'src/user/entities/user.entity';
import { JwtWithUser } from './entities/auth._entity';
import { OtpService } from '../otp/otp.service';
import { MailService } from '../mail/mail.service';
import { ACCESS_TOKEN_EXPIRY, FULL_WEB_URL, REFRESH_TOKEN_EXPIRY } from 'src/util/config/config';
import { OtpType } from 'src/otp/entities/otp.entity';
// import { ApolloError } from 'apollo-server-core';
import { TokenService } from 'src/token/token.service';
import { ApolloError } from 'apollo-server-core';
import { Http } from 'src/util/http';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly OtpService: OtpService,
    private readonly MailService: MailService,
    private readonly tokenService: TokenService,
    private readonly http: Http
  ) { }

  async signUp(input: SignUpInput): Promise<User> {
    const { phone } = input

    const user = await this.userService.getOne({ where: { phone } })
    if (user) {
      throw new ApolloError('User already exist', 'USER_ALREADY_EXISTS', {
        statusCode: 409, // Conflict status code for a resource conflict
      });
    }

    // hash password using bcryptjs
    const password = await bcrypt.hash(input.password, 12)

    return await this.userService.create(_.merge(input, { phone, password }))
  }

  async signIn(input: SignInInput): Promise<JwtWithUser> {
    const user = await this.userService.getOne({ where: { phone: input.phone } });
    console.log(user)
    if (!user) {
      throw new ApolloError('User doesn\'t exist', 'USER_NOT_FOUND', {
        statusCode: 404, // Not Found
      });
    }
    if (!user.phone_verified) {
      throw new ApolloError('Please verify your phone number to proceed', 'PHONE_NOT_VERIFIED', {
        statusCode: 403, // Forbidden
      });
    }

    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new ApolloError('Invalid password', 'INVALID_CREDENTIALS', {
        statusCode: 401, // Unauthorized
      });
    }

    const refresh_token = await this.tokenService.createRefreshToken(user, Number(REFRESH_TOKEN_EXPIRY));
    const access_token = await this.tokenService.createAccessToken(user, Number(ACCESS_TOKEN_EXPIRY));

    return { user, access_token, refresh_token };
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.getOne({ where: { email: email } });
    if (!user) {
      throw new ApolloError('Email doesn\'t exist!', 'EMAIL_NOT_FOUND', {
        statusCode: 404, // Not Found
      });
    }

    const token = await this.tokenService.createAccessToken(user, Number(ACCESS_TOKEN_EXPIRY));
    const url = `${FULL_WEB_URL}/reset-password/${token}`;

    return await this.MailService.sendResetPasswordLink(email, url);
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = await this.tokenService.decodeAccessToken(token);

      const user = await this.tokenService.getUserFromRefreshTokenPayload(payload);
      if (!user) {
        throw new ApolloError('Malformed token', 'MALFORMED_TOKEN', {
          statusCode: 400, // Bad Request
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const updatedUser = await this.userService.update(user.id, { password: hashPassword });

      if (!updatedUser) {
        throw new ApolloError('Failed to update password', 'PASSWORD_UPDATE_FAILED', {
          statusCode: 500, // Internal Server Error
        });
      }

      return true;
    } catch (error) {
      // Handle any unexpected errors here
      throw new ApolloError('An error occurred while resetting the password', 'INTERNAL_ERROR', {
        statusCode: 500, // Internal Server Error
        errorDetails: error.message, // Include more details about the error if needed
      });
    }
  }

  async requestOtpVerify(phone: string, otpType: OtpType): Promise<boolean> {
    try {
      const user = await this.userService.getOne({ where: { phone } });
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const otp = await this.OtpService.create(user, otpType);
      console.log(otp)

      const message = `Your OTP for ${otpType.toLowerCase()} is ${otp.code}`;
      await this.http.sendSms(phone, message);

      return true;
    } catch (error) {
      // Handle any unexpected errors here
      throw new BadRequestException(error.message);
    }
  }

  async verifyPhone(phone: string, otpCode: string): Promise<boolean> {
    try {
      const user = await this.userService.getOne({ where: { phone } });
      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (otpCode === "123456") {
        // For testing purposes, you can consider the phone verified with a dummy OTP.
        // Remove this block when implementing OTP verification.
        await this.userService.update(user.id, { phone_verified: true });
        return true;
      }

      // Implement OTP verification logic here
      // Retrieve the OTP associated with the user and check if it matches otpCode

      // If the OTP is valid, set user.phone_verified to true and update the user
      await this.userService.update(user.id, { phone_verified: true });

      return true;
    } catch (error) {
      // Handle any unexpected errors here
      throw new BadRequestException(error.message);
    }
  }

  async logout(query: User, refreshToken: string): Promise<boolean> {
    const user = await this.userService.getOne({ where: { id: query.id } });
    const payload = await this.tokenService.decodeRefreshToken(refreshToken)
    return await this.tokenService.deleteRefreshToken(user, payload)
  }

  async logoutFromAll(query: User): Promise<boolean> {
    const user = await this.userService.getOne({ where: { id: query.id } });
    return await this.tokenService.deleteRefreshTokensForUser(user)
  }


  async validateUser(input: SignInInput) {
    const { phone, password } = input;

    const user = await this.userService.getOne({ where: { phone } });
    if (!user) {
      return null;
    }
    if (!user.phone_verified) {
      throw new BadRequestException('Phone not verified');
    }
    const isValid: boolean = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return user;
  }
}
