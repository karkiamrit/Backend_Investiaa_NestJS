import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('InvestmentRangeInput')
export class InvestmentRange {
  @Field({ nullable: true })
  from: number;

  @Field({ nullable: true })
  to: number;
}
