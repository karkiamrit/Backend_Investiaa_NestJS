import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { OtpRepository } from './otp.repository';
import { Otp, OtpType } from './entities/otp.entity';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) { }

  /**
   * It creates OTP for an operation type, set an expiration time and save it to database
   * @param {User} user - The user object which we are creating OTP for
   * @param otpType - The type of the OTP (e.g. PHONE_VERIFICATION)
   * @returns The OTP object
   */
  async create(user: User, otpType: OtpType): Promise<Otp> {
    const otpCode = String(Math.floor(100000 + Math.random() * 900000))
    const expiresIn = new Date(Date.now() + (15 * 60_000))

    return this.otpRepository.create({
      code: otpCode,
      operation: otpType,
      user,
      expires_in: expiresIn
    })
  }

  getOne(otpCode: string, user: User, operation: OtpType): Promise<Otp | null> {
    return this.otpRepository.findOne({ where: { code: otpCode, user: { id: user.id }, operation } })
  }

  async update(otp: Otp): Promise<Boolean> {
    await this.otpRepository.save(otp)
    return true
  }

}
