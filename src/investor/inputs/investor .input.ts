import { IsOptional } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateInvestorInput {
  @Field(()=>Number, { nullable: true })
  @IsOptional()
  profession_experience?: number
}

@InputType()
export class UpdateInvestorInput {
  @Field(()=>Number, { nullable: true })
  @IsOptional()
  profession_experience?: number
}
