import {
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
import { User } from 'src/user/entities/user.entity';
import { Bid } from 'src/bid/entities/bid.entity';

@ObjectType()
@Entity()
export class Incubator {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => [String])
  @Column('simple-array')
  services_offered: string[];

  @OneToMany(() => Bid, (bid) => bid.investor)
  bids: Bid[];

  @Field(() => [String])
  @Column('simple-array')
  preferred_roi_type: string[];

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
export class GetIncubatorType {
  @Field(() => [Incubator], { nullable: true })
  data?: Incubator[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
