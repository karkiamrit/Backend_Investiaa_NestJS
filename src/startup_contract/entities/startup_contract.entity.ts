import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entrepreneur } from 'src/entrepreneur/entities/entrepreneur.entity';
import { Bid } from 'src/bid/entities/bid.entity';

@ObjectType()
@Entity()
export class StartupContract extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Entrepreneur)
  @OneToOne(() => Entrepreneur, { eager: true })
  @JoinColumn({ name: 'entrepreneur_id' })
  entrepreneur: Entrepreneur;

  @Field(() => Bid, { nullable: true })
  @OneToOne(() => Bid, { eager: true })
  @JoinColumn({ name: 'bid_id' })
  bid: Bid;
}

@ObjectType()
export class GetStartupContractType {
  @Field(() => [StartupContract], { nullable: true })
  data?: StartupContract[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
