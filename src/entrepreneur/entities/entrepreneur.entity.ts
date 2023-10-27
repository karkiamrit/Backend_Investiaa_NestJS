import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Entrepreneur {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;



  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profession?: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  profession_experience?: number;
}

@ObjectType()
export class GetEntrepreneurType {
  @Field(() => [Entrepreneur], { nullable: true })
  data?: Entrepreneur[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
