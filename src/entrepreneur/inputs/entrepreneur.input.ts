import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Profession } from './profession.input';
import { Entrepreneur } from '../entities/entrepreneur.entity';

@InputType()
export class CreateEntrepreneurInput extends Entrepreneur {

  @Field(() => Profession, { nullable: true })
  @IsOptional()
  @IsObject()
  profession: Profession;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  has_prior_startups: boolean;
}

@InputType()
export class UpdateEntrepreneurInput implements Partial<Entrepreneur>{

  @Field(() => Profession, { nullable: true })
  @IsOptional()
  @IsObject()
  profession?: Profession;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  has_prior_startups?: boolean;
}
