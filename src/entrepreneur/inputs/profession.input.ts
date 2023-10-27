import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
@InputType('ProfessionInput')
export class Profession {
    @Field()
    designation?: string;

    @Field()
    years_of_experience?: number;
}