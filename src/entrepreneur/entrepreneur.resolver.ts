import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EntrepreneurService } from './entrepreneur.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import {
  GetEntrepreneurType,
  Entrepreneur,
} from './entities/entrepreneur.entity';
import {
  CreateEntrepreneurInput,
  UpdateEntrepreneurInput,
} from './inputs/entrepreneur.input';
@Resolver()
export class EntrepreneurResolver {
  constructor(private readonly entrepreneurService: EntrepreneurService) {}

  @Query(() => GetEntrepreneurType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyEntrepreneurs(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Entrepreneur>,
    @CurrentQuery() query: string,
  ) {
    return this.entrepreneurService.getMany(qs, query);
  }

  @Query(() => Entrepreneur)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneEntrepreneur(
    @Args({ name: 'input' })
    qs: GetOneInput<Entrepreneur>,
    @CurrentQuery() query: string,
  ) {
    return this.entrepreneurService.getOne(qs, query);
  }

  @Mutation(() => Entrepreneur)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createEntrepreneur(@Args('input') input: CreateEntrepreneurInput) {
    return this.entrepreneurService.create(input);
  }

  @Mutation(() => [Entrepreneur])
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createManyEntrepreneur(
    @Args({ name: 'input', type: () => [CreateEntrepreneurInput] })
    input: CreateEntrepreneurInput[],
  ) {
    return this.entrepreneurService.createMany(input);
  }

  @Mutation(() => Entrepreneur)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateEntrepreneur(
    @Args('id') id: number,
    @Args('input') input: UpdateEntrepreneurInput,
  ) {
    return this.entrepreneurService.update(id, input);
  }

  @Mutation(() => Entrepreneur)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteEntrepreneur(@Args('id') id: number) {
    return this.entrepreneurService.delete(id);
  }
}
