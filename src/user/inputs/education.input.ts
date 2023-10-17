import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('Education')
export class EducationInput {
  @Field(() => String, { nullable: true })
  major: string;

  @Field({ nullable: true })
  level: EducationLevel;
}

enum EducationLevel {
  Phd = 'Phd',
  MPhill = 'M Phill',
  Masters = 'Masters',
  Bachelors = 'Bachelors',
}
