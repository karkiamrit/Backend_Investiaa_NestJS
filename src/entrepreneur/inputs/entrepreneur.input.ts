import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Profession } from './profession.input';

@InputType()
export class CreateEntrepreneurInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  profession_experience?: number;

  @Field(() => Profession, { nullable: true })
  @IsOptional()
  @IsObject()
  profession: Profession;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsNotEmpty()
  has_prior_startups: boolean;
}

@InputType()
export class UpdateEntrepreneurInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  profession_experience?: number;

  @Field(() => Profession, { nullable: true })
  @IsOptional()
  @IsObject()
  profession?: Profession;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  has_prior_startups?: boolean;
}
