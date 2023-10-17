import { UserService } from '../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInInput, SignUpInput } from 'src/auth/inputs/auth.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash';
import { User } from 'src/user/entities/user.entity';
import { JwtWithUser } from './entities/auth._entity';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly OtpService: OtpService,
  ) { }

  private signJWT(user: User) {
    return this.jwtService.sign(pick(user, ['id', 'role']));
  }

  async signUp(input: SignUpInput): Promise<JwtWithUser> {
    const doesExistId = await this.userService.getOne({
      where: { phone: input.phone },
    });
    if (doesExistId) {
      throw new BadRequestException('Phone already exists');
    }

    const user = await this.userService.create(input);

    return this.signIn(user);
  }

  signIn(user: User) {
    const jwt = this.signJWT(user);

    return { jwt, user };
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
