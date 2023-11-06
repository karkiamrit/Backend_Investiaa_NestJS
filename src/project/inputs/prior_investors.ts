import { IsOptional } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { YearScalar } from 'src/modules/types/scalars/year.scalar';
// import { GraphQLUpload, Upload } from 'graphql-upload-ts';

@InputType()
export class TeamMemberInput {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name: string;

  @Field(() => YearScalar, { nullable: true })
  @IsOptional()
  date: Date;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  equity: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  amount: number;
}
