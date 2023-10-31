import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
// import { GraphQLUpload, Upload } from 'graphql-upload-ts';

@InputType()
export class CreateProject_detailsInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  status: string;

  @Field(() => String)
  @IsNotEmpty()
  logo: string;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  domain: string;

  @Field(() => String)
  @IsNotEmpty()
  fund_preference: string;

  @Field(() => String)
  @IsNotEmpty()
  tagline: string;

  @Field(() => String)
  @IsNotEmpty()
  tax_clearence_docs: string;

  @Field(() => String)
  @IsNotEmpty()
  registeration_docs: string;

  @Field(() => String)
  @IsNotEmpty()
  financial_projection_docs: string;

  @Field(() => String)
  @IsNotEmpty()
  pitch_deck: string;

  @Field(() => String)
  @IsNotEmpty()
  adhoc_file: string;

  @Field(() => String)
  @IsNotEmpty()
  usp: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  social_media_links: string[];

  @Field(() => String)
  @IsNotEmpty()
  team_members: string;

  @Field(() => String)
  @IsNotEmpty()
  prior_investors: string;
}

@InputType()
export class UpdateProject_detailsInput {
  @Field(() => String)
  @IsOptional()
  name: string;

  @Field(() => String)
  @IsOptional()
  logo: string;

  @Field(() => String)
  @IsOptional()
  status: string;

  @Field(() => String)
  @IsOptional()
  description: string;

  @Field(() => String)
  @IsOptional()
  domain: string;

  @Field(() => String)
  @IsOptional()
  fund_preference: string;

  @Field(() => String)
  @IsOptional()
  tagline: string;

  @Field(() => String)
  @IsOptional()
  tax_clearence_docs: string;

  @Field(() => String)
  @IsOptional()
  registeration_docs: string;

  @Field(() => String)
  @IsOptional()
  financial_projection_docs: string;

  @Field(() => String)
  @IsOptional()
  pitch_deck: string;

  @Field(() => String)
  @IsOptional()
  adhoc_file: string;

  @Field(() => String)
  @IsOptional()
  usp: string;

  @Field(() => [String])
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  social_media_links: string[];

  @Field(() => String)
  @IsOptional()
  team_members: string;

  @Field(() => String)
  @IsOptional()
  prior_investors: string;
}
