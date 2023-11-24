import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Profession } from '../../modules/types/common/profession.input';
import { InvestmentRange } from '../inputs/investment_range.types';
import { PriorInvestment } from '../inputs/prior_investment.type';
import { Bid } from '../../bid/entities/bid.entity';

@ObjectType()
@Entity()
export class Investor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Bid, (bid) => bid.investor)
  bids: Bid[];

  @Field(() => Profession)
  @Column('json', { nullable: true })
  profession: Profession;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  profession_experience?: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => InvestmentRange, { nullable: true })
  @Column('json', { nullable: true })
  investment_range: InvestmentRange;

  @Field(() => [PriorInvestment], { nullable: true })
  @Column('json', { nullable: true })
  prior_investments: PriorInvestment[];

  @Field(() => [String])
  @Column('simple-array', { nullable: true })
  preferred_investment_stage: string[];

  @Field(() => [String])
  @Column('simple-array', { nullable: true })
  investment_preferences: string[];

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
  @Field(() => [Investor], { nullable: true })
  data?: Investor[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
