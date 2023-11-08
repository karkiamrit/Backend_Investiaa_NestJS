import {
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

@ObjectType()
@Entity()
export class Bid {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Investor, (investor) => investor.bids, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @Field(() => Investor, { nullable: true })
  @JoinColumn({ name: 'investor_id' })
  investor: Investor;

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
}

@ObjectType()
export class GetBidType {
  @Field(() => [Bid], { nullable: true })
  data?: Bid[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
