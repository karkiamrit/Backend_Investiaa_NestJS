import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entrepreneur } from 'src/entrepreneur/entities/entrepreneur.entity';

@ObjectType()
@Entity()
export class Project_details {
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

  @Field(() => String)
  @Column()
  tax_clearence_docs: string;

  @Field(() => String)
  @Column()
  registeration_docs: string;

  @Field(() => String)
  @Column()
  financial_projection_docs: string;

  @Field(() => String)
  @Column()
  pitch_deck: string;

  @Field(() => String)
  @Column()
  adhoc_file: string;

  @Field(() => String)
  @Column()
  usp: string;

  @Field(() => [String])
  @Column('simple-array')
  social_media_links: string[];

  @Field(() => String)
  @Column()
  team_members: string;

  @Field(() => String)
  @Column()
  prior_investors: string;

  @Field(() => Entrepreneur)
  @OneToOne(() => Entrepreneur, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'entrepreneur_id' })
  entrepreneur: Entrepreneur;
}

@ObjectType()
export class GetProject_detailsType {
  @Field(() => [Project_details], { nullable: true })
  data?: Project_details[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
