import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsNotEmpty()
  @MinLength(10, { message: 'Phone number should be atleast 10 digits long' })
  @MaxLength(10, { message: 'Phone number should be atmost 10 digits long' })
  phone: string;

  @Field()
  @IsNotEmpty()
  // @MinLength(10, { message: 'Password shout be atleast 10 digits long' })
  password: string;
}

@InputType()
export class SignUpInput extends SignInInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  email: string;
}
