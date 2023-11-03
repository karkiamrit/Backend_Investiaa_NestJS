import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { EducationInput } from './education.input';
import { AddressInput } from './address.input';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(10, { message: 'Phone number should be atleast 10 digits long' })
  @MaxLength(10, { message: 'Phone number should be atmost 10 digits long' })
  phone: string;

  @Field(() => String)
  @IsNotEmpty()
  // @MinLength(10, { message: 'Phone number should be atleast 10 digits long' })
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(255, {
    message: 'Username number should be atmost 255 characters long',
  })
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  role: 'admin' | 'user';

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
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
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  username?: string;

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
