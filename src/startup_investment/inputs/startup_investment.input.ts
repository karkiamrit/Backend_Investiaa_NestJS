import { IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStartup_investmentInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  project_id?: number;
}

@InputType()
export class UpdateStartup_investmentInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  project_id?: number;
}
