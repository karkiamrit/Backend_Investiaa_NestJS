import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Profession } from '../../modules/types/common/profession.input';
import { InvestmentRange } from './investment_range.types';
import { PriorInvestment } from './prior_investment.type';

@InputType()
export class CreateInvestorInput {
  @Field(() => [PriorInvestment])
  @IsOptional()
  prior_investments: PriorInvestment[];

  @Field(() => InvestmentRange)
  @IsNotEmpty()
  investment_range: InvestmentRange;

  @Field(() => [String])
  @IsNotEmpty()
  preferred_investment_stage: string[];

  @Field(() => [String])
  @IsNotEmpty()
  investment_preferences: string[];

  @Field(() => Profession, { nullable: true })
  @IsOptional()
  profession: Profession;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  profession_experience?: number;
}

@InputType()
export class UpdateInvestorInput {
  @Field(() => [PriorInvestment], { nullable: true })
  @IsOptional()
  prior_investments?: PriorInvestment[];

  @Field(() => InvestmentRange, { nullable: true })
  @IsOptional()
  investment_range?: InvestmentRange;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  preferred_investment_stage?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  investment_preferences?: string[];

  @Field(() => Profession, { nullable: true })
  @IsOptional()
  profession?: Profession;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  profession_experience?: number;
}
