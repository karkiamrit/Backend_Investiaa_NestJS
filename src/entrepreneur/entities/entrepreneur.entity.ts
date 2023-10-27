import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Profession } from '../inputs/profession.input';

@ObjectType()
@Entity()
export class Entrepreneur {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  has_prior_startups?: boolean;

  @Field(() => User)
  @OneToOne(() => User, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Field(() => Profession, { nullable: true })
  @Column('json')
  profession: Profession;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  profession_experience?: number;
}

@ObjectType()
export class GetEntrepreneurType {
  @Field(() => [Entrepreneur], { nullable: true })
  data?: Entrepreneur[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
