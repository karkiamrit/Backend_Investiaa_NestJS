import { IsOptional } from 'class-validator';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
// import { GraphQLUpload, Upload } from 'graphql-upload-ts';

@ObjectType()
@InputType('TeamMemberInput')
export class TeamMember extends BaseEntity {
  // @PrimaryGeneratedColumn('increment')
  // @Field(() => ID)
  // id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  designation?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  contact_number?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  expertise?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  education_level?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  bio?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  photo?: string;

  
}
