import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
// import { GraphQLUpload, Upload } from 'graphql-upload-ts';

@InputType()
export class CreateProjectInput {
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
export class UpdateProjectInput {
  @Field(() => String,{nullable:true })
  @IsOptional()
  name?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  logo?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  status?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  description?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  domain?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  fund_preference?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  tagline?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  tax_clearence_docs?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  registeration_docs?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  financial_projection_docs?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  pitch_deck?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  adhoc_file?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  usp?: string;

  @Field(() => [String],{nullable:true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  social_media_links?: string[];

  @Field(() => String,{nullable:true })
  @IsOptional()
  team_members?: string;

  @Field(() => String,{nullable:true })
  @IsOptional()
  prior_investors?: string;
}
