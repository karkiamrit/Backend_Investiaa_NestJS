import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProject_detailsInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}

@InputType()
export class UpdateProject_detailsInput {
  @Field(() => String)
  @IsOptional()
  name: string;
}
