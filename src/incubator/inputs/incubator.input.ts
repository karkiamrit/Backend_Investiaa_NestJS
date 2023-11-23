import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIncubatorInput {
  @Field(() => [String])
  @IsNotEmpty()
  services_offered: string[];

  @Field(() => [String])
  @IsNotEmpty()
  preferred_roi_type: string[];
}

@InputType()
export class UpdateIncubatorInput {
  @Field(() => [String])
  @IsOptional()
  services_offered: string[];

  @Field(() => [String])
  @IsOptional()
  preferred_roi_type: string[];
}
