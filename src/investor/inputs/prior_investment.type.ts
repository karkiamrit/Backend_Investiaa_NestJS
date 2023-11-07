import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { BaseEntity } from 'typeorm';

@ObjectType()
@InputType('PriorInvestmentInput')
export class PriorInvestment extends BaseEntity {
  
  @Field(() => Number, { nullable: true })
  id: number;

  @Field({ nullable: true })
  company_name: string;

  @Field({ nullable: true })
  date: Date;
}
