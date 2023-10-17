import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { EducationInput } from './education.input';
import { AddressInput } from './address.input';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  phone: string;

  // @Field(() => String)
  // @IsNotEmpty()
  // username: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  nickname: string;

  @Field(() => String)
  @IsNotEmpty()
  role: 'admin' | 'user';

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  bio?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  avatar?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsOptional()
  email_verified: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsOptional()
  phone_verified: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsOptional()
  kyc_verified: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  facebook?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  twitter?: string;

  @Field({ nullable: true })
  @IsOptional()
  reset_token?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  instagram?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  whatsapp?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  preferred_sector?: string[];

  @Field(() => EducationInput, { nullable: true })
  @IsOptional()
  education?: EducationInput;

  @Field(() => [AddressInput], { nullable: true })
  @IsOptional()
  address?: AddressInput;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  // @Field(() => String, { nullable: true })
  // @IsOptional()
  // username?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  nickname?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  role?: 'admin' | 'user';

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  bio?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  avatar?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  email_verified?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  phone_verified?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  kyc_verified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  reset_token?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  facebook?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  twitter?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  instagram?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  whatsapp?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  preferred_sector?: string[];

  @Field(() => EducationInput, { nullable: true })
  @IsOptional()
  education?: EducationInput;

  @Field(() => AddressInput, { nullable: true })
  @IsOptional()
  address?: AddressInput;
}

@InputType()
export class UserIdInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}
