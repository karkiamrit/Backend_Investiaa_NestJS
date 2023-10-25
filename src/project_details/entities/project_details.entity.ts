import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Project_details {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column()
  name: string;
}

@ObjectType()
export class GetProject_detailsType {
  @Field(() => [Project_details], { nullable: true })
  data?: Project_details[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
