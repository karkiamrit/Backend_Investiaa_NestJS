import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BidService } from './bid.service';
import { GetManyInput, GetOneInput } from '../declare/inputs/custom.input';
import { CurrentQuery } from '../modules/decorators/query.decorator';
import { GetBidType, Bid } from './entities/bid.entity';
import { CreateBidInput, UpdateBidInput } from './inputs/bid.input';
import { CurrentUser } from '../modules/decorators/user.decorator';
import { User } from '../user/entities/user.entity';

import GraphQLJSON from 'graphql-type-json';
@Resolver()
export class BidResolver {
  constructor(private readonly bidService: BidService) {}

  @Query(() => GetBidType, {
    description: 'Returns multiple bids based on the provided input',
  })
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  getManyBids(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Bid>,
    @CurrentQuery() query: string,
  ) {
    return this.bidService.getMany(qs, query);
  }

  @Query(() => Bid || null, {
    description:
      'Returns a single bid based on the bid id; only applicable for admin',
  })
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneBid(
    @Args({ name: 'input' })
    qs: GetOneInput<Bid>,
    @CurrentQuery() query: string,
  ) {
    return this.bidService.getOne(qs, query);
  }

  @Mutation(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  createBid(
    @Args('input') input: CreateBidInput,
    @Args('projectID') projectID: number,
    @CurrentUser() user: User,
  ) {
    return this.bidService.create(input, projectID, user);
  }

  @Mutation(() => [Bid])
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createManyBid(
    @Args({ name: 'input', type: () => [CreateBidInput] })
    input: CreateBidInput[],
  ) {
    return this.bidService.createMany(input);
  }

  @Mutation(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateBid(@Args('id') id: number, @Args('input') input: UpdateBidInput) {
    return this.bidService.update(id, input);
  }

  @Mutation(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async updateBidProfile(
    @Args('id') id: number,
    @Args('input') input: UpdateBidInput,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    await this.bidService.validateBid(query, user, id);
    return this.bidService.update(id, input);
  }

  @Mutation(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async deleteBidProfile(
    @Args('id') id: number,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    await this.bidService.validateBid(query, user, id);
    return this.bidService.delete(id);
  }

  @Query(() => GetBidType, {
    description:
      'get bids associated with the current investor; only applicable for investor',
  })
  @UseGuards(new GraphqlPassportAuthGuard())
  async getMyBidProfileByInvestorID(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Bid>,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    const { currentInvestor, currentIncubator } =
      await this.bidService.validateUser(user);
    const fixedInvestorField = {
      investor: { id: currentInvestor.id },
    };

    const queryString: GetManyInput<Bid> = {
      where: { ...fixedInvestorField },
      order: qs.order,
      pagination: qs.pagination,
    };
    return await this.bidService.getMany(queryString, query);
  }

  @Query(() => GetBidType, {
    description:
      'get bids associated with the current investor; only applicable for investor',
  })
  @UseGuards(new GraphqlPassportAuthGuard())
  async getMyBidProfileByIncubatorID(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Bid>,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    const { currentIncubator } = await this.bidService.validateUser(user);
    const fixedIncubatorField = {
      incubator: { id: currentIncubator.id },
    };

    const queryString: GetManyInput<Bid> = {
      where: { ...fixedIncubatorField },
      order: qs.order,
      pagination: qs.pagination,
    };
    return await this.bidService.getMany(queryString, query);
  }

  @Mutation(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard())
  deleteBid(@Args('id') id: number) {
    return this.bidService.delete(id);
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(new GraphqlPassportAuthGuard())
  async acceptBidInvestor(@Args('bidID') bidID: number) {
    return await this.bidService.acceptBidInvestor(bidID);
  }
}
