import { IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEntrepreneurInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  profession_experience?: number;
}

@InputType()
export class UpdateEntrepreneurInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  profession_experience?: number;
}
