import { IsOptional } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'typeorm';
// import { YearScalar } from '../../modules/types/scalars/year.scalar';

@ObjectType()
@InputType('PriorInvestorInput')
export class PriorInvestor extends BaseEntity {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  date?: Date;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  equity?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  amount?: number;
}
