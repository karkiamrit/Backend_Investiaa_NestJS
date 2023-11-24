import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entrepreneur } from '../../entrepreneur/entities/entrepreneur.entity';
import { PriorInvestor } from '../inputs/prior_investors';
import { TeamMember } from '../inputs/team_members.input';
import { ArrayMaxSize } from 'class-validator';
import { Bid } from '../../bid/entities/bid.entity';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column()
  logo: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  domain: string;

  @Field(() => String)
  @Column()
  fund_preference: string;

  @Field(() => String)
  @Column()
  tagline: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  tax_clearence_docs: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  registeration_docs: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  financial_projection_docs: string;

  @Field(() => String)
  @Column()
  pitch_deck: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  adhoc_file: string;

  @Field(() => String)
  @Column()
  usp: string;

  @Field(() => [String])
  @Column('simple-array')
  social_media_links: string[];

  @Field(() => [TeamMember], { nullable: true })
  @Column('json', { nullable: true })
  @ArrayMaxSize(5)
  team_members?: TeamMember[];

  @Field(() => [PriorInvestor], { nullable: true })
  @Column('json', { nullable: true })
  prior_investors?: PriorInvestor[];

  @Field(() => Date)
  @Column()
  bid_opening: Date;

  @Field(() => Date)
  @Column()
  bid_closing: Date;

  @Field(() => Entrepreneur)
  @ManyToOne(() => Entrepreneur, (entrepreneur) => entrepreneur.projects, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'entrepreneur_id' })
  entrepreneur: Entrepreneur;

  @OneToMany(() => Bid, (bid) => bid.project)
  bids: Bid[];

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
export class GetProjectType {
  @Field(() => [Project], { nullable: true })
  data?: Project[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
