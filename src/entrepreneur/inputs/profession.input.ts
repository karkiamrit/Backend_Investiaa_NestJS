import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('ProfessionInput')
export class Profession {
  @Field({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  years_of_experience?: number;
}
