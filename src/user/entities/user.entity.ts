// import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { EducationInput, AddressInput } from '../inputs';
// import { Place } from 'src/place/entities/place.entity';

const BCRYPT_HASH_ROUNDS = 10;

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  phone: string;

  // @Field(() => String, { nullable: true })
  // @IsEmail()
  // @Column()
  // username: string;

  @Column()
  password: string;

  @Field(() => String)
  @Column()
  nickname: string;

  @Field(() => String, { defaultValue: 'user' })
  @Column()
  role: 'admin' | 'user';

  @Field(() => Date)
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field()
  @Column({ default: false })
  email_verified: boolean;

  @Field()
  @Column({ default: false })
  phone_verified: boolean;

  @Field()
  @Column({ default: false })
  kyc_verified: boolean;

  @Field()
  @Column({ nullable: true })
  facebook?: string;

  @Field()
  @Column({ nullable: true })
  instagram?: string;

  @Field()
  @Column({ nullable: true })
  twitter?: string;

  @Field()
  @Column({ nullable: true })
  whatsapp?: string;

  @Field(() => [String], { nullable: true })
  @Column('json', { nullable: true })
  preferred_sector?: string[];

  @Field(() => EducationInput, { nullable: true })
  @Column('json', { nullable: true })
  education?: EducationInput;

  @Field(() => AddressInput, { nullable: true })
  @Column('json', { nullable: true })
  address?: AddressInput;

  // @Field(() => [Place], { nullable: true })
  // @OneToMany(() => Place, (place) => place.user, {
  //   nullable: true,
  // })
  // place: Place[];

  @BeforeInsert()
  async beforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
    }

    if (!this.role) {
      this.role = 'user';
    }
  }
}

@ObjectType()
export class GetUserType {
  @Field(() => [User], { nullable: true })
  data?: User[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
