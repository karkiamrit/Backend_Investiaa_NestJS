import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvestorService } from './investor.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetInvestorType, Investor } from './entities/investor.entity';
import {
  CreateInvestorInput,
  UpdateInvestorInput,
} from './inputs/investor.input';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import GraphQLJSON from 'graphql-type-json';
@Resolver()
export class InvestorResolver {
  constructor(private readonly investorService: InvestorService) {}

  @Query(() => GetInvestorType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyInvestors(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Investor>,
    @CurrentQuery() query: string,
  ) {
    return this.investorService.getMany(qs, query);
  }

  @Query(() => Investor || null)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneInvestor(
    @Args({ name: 'input' })
    qs: GetOneInput<Investor>,
    @CurrentQuery() query: string,
  ) {
    return this.investorService.getOne(qs, query);
  }

  @Mutation(() => Investor)
  @UseGuards(new GraphqlPassportAuthGuard())
  createInvestor(
    @Args('input') input: CreateInvestorInput,
    @CurrentUser() user: User,
  ) {
    return this.investorService.create(input, user);
  }

  // @Mutation(() => [Investor])
  // @UseGuards(new GraphqlPassportAuthGuard('admin'))
  // createManyInvestor(
  //   @Args({ name: 'input', type: () => [CreateInvestorInput] })
  //   input: CreateInvestorInput[],
  // ) {
  //   return this.investorService.createMany(input);
  // }

  @Mutation(() => Investor)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateInvestor(
    @Args('id') id: number,
    @Args('input') input: UpdateInvestorInput,
  ) {
    return this.investorService.update(id, input);
  }

  @Mutation(() => Investor)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteInvestor(@Args('id') id: number) {
    return this.investorService.delete(id);
  }

  @Mutation(() => Investor)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async updateInvestorProfile(
    @Args('input') input: UpdateInvestorInput,
    @CurrentUser() user: User,
  ) {
    const investor = await this.investorService.getOneByUserId(user.id);
    if (!investor) {
      throw new Error('Investor profile not found for the user.');
    }

    // Check if the user owns the profile
    if (investor.user.id !== user.id) {
      throw new Error('Unauthorized to update this profile.');
    }

    // Update the profile
    return this.investorService.update(investor.id, input);
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async deleteInvestorProfile(@CurrentUser() user: User) {
    const investor = await this.investorService.getOneByUserId(user.id);
    if (!investor) {
      throw new Error('Investor profile not found for the user.');
    }

    // Check if the user owns the profile
    if (investor.user.id !== user.id) {
      throw new Error('Unauthorized to delete this profile.');
    }

    // Delete the profile
    this.investorService.delete(investor.id);

    return { status: 'success' };
  }

  @Query(() => Investor || null)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async getMyInvestorProfile(@CurrentUser() user: User) {
    const investor = await this.investorService.findInvestorByUserId(user.id);
    if (!investor) {
      throw new Error('Investor profile not found for the user.');
    }
    return this.investorService.getMyInvestorProfile(investor.id);
  }
}
