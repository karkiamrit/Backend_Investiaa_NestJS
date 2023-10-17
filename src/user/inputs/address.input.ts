import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('Address')
export class AddressInput {
  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => String, { nullable: true })
  country: string;
}
