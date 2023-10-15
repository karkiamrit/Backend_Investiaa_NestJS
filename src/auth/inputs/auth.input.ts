import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class SignUpInput extends SignInInput {
  @Field()
  @IsNotEmpty()
  nickname: string;
}
