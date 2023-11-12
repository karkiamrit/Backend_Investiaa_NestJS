import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Startup_investmentService } from './startup_investment.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import {
  GetStartup_investmentType,
  Startup_investment,
} from './entities/startup_investment.entity';
import {
  CreateStartup_investmentInput,
  UpdateStartup_investmentInput,
} from './inputs/startup_investment.input';
@Resolver()
export class Startup_investmentResolver {
  constructor(
    private readonly startup_investmentService: Startup_investmentService,
  ) {}

  @Query(() => GetStartup_investmentType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyStartup_investments(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Startup_investment>,
    @CurrentQuery() query: string,
  ) {
    return this.startup_investmentService.getMany(qs, query);
  }

  @Query(() => Startup_investment)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneStartup_investment(
    @Args({ name: 'input' })
    qs: GetOneInput<Startup_investment>,
    @CurrentQuery() query: string,
  ) {
    return this.startup_investmentService.getOne(qs, query);
  }

  @Mutation(() => Startup_investment)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createStartup_investment(
    @Args('input') input: CreateStartup_investmentInput,
  ) {
    return this.startup_investmentService.create(input);
  }

  @Mutation(() => [Startup_investment])
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createManyStartup_investment(
    @Args({ name: 'input', type: () => [CreateStartup_investmentInput] })
    input: CreateStartup_investmentInput[],
  ) {
    return this.startup_investmentService.createMany(input);
  }

  @Mutation(() => Startup_investment)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateStartup_investment(
    @Args('id') id: number,
    @Args('input') input: UpdateStartup_investmentInput,
  ) {
    return this.startup_investmentService.update(id, input);
  }

  @Mutation(() => Startup_investment)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteStartup_investment(@Args('id') id: number) {
    return this.startup_investmentService.delete(id);
  }
}
