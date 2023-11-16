import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Investment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column()
  type: string;

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
export class GetInvestmentType {
  @Field(() => [Investment], { nullable: true })
  data?: Investment[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
