import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateKycInput {
  @Field(() => String)
  @IsNotEmpty()
  citizenship: string;

  @Field(() => String)
  @IsOptional()
  passport: string;

  @Field(() => String)
  @IsOptional()
  driving_license: string;
}

@InputType()
export class UpdateKycInput {
  @Field(() => String)
  @IsOptional()
  citizenship: string;

  @Field(() => String)
  @IsOptional()
  passport: string;

  @Field(() => String)
  @IsOptional()
  driving_license: string;
}
