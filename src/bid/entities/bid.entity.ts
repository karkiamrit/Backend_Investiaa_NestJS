import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Investor } from '../../investor/entities/investor.entity';
import { Project } from '../../project/entities/project.entity';
import { Incubator } from 'src/incubator/entities/incubator.entity';

@ObjectType()
@Entity()
export class Bid extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Investor, (investor) => investor.bids, {
    eager: true,
  })
  @Field(() => Investor, { nullable: true })
  @JoinColumn({ name: 'investor_id' })
  investor: Investor;

  @ManyToOne(() => Investor, (investor) => investor.bids, {
    eager: true,
  })
  @Field(() => Incubator, { nullable: true })
  @JoinColumn({ name: 'incubator_id' })
  incubator: Incubator;

  @ManyToOne(() => Project, (project) => project.bids, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @Field(() => Project, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  loan_amount?: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  loan_percent?: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  equity: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  loan_years: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  equity_amount: number;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  service_offered: string[];

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

  @Field(() => Boolean)
  @Column({ default: false })
  accepted: boolean;

  @Field()
  @Column()
  type: 'incubator' | 'investor';
}

@ObjectType()
export class GetBidType {
  @Field(() => [Bid], { nullable: true })
  data?: Bid[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
