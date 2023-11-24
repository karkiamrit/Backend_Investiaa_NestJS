import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBidInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  loan_amount?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  loan_percent?: number;

  @Field(() => Number)
  @IsNotEmpty()
  equity: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  loan_years: number;

  @Field(() => Number)
  @IsNotEmpty()
  equity_amount: number;

  @Field(() => Number)
  @IsOptional()
  fee: number;

  @Field()
  @IsNotEmpty()
  type: 'incubator' | 'investor';

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  service_offered: string[];
}

@InputType()
export class UpdateBidInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  loan_amount?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  loan_percent?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  equity: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  fee: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  loan_years: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  equity_amount: number;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  service_offered: string[];
}
