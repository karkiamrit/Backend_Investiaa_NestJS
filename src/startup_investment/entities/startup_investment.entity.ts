import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Startup_investment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  project_id?: number;
}

@ObjectType()
export class GetStartup_investmentType {
  @Field(() => [Startup_investment], { nullable: true })
  data?: Startup_investment[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
