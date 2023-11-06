import {
  Column,
CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
UpdateDateColumn,
} from 'typeorm'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity()
export class Investor  {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  profession_experience?: number

  @Field()
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

}

@ObjectType()
export class GetInvestorType {
  @Field(() => [Investor ], { nullable: true })
  data?: Investor [];

  @Field(() => Number, { nullable: true })
  count?: number;
}
