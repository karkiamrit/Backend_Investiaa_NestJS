import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BidService } from './bid.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetBidType, Bid } from './entities/bid.entity';
import { CreateBidInput, UpdateBidInput } from './inputs/bid.input';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
@Resolver()
export class BidResolver {
  constructor(private readonly bidService: BidService) {}

  @Query(() => GetBidType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyBids(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Bid>,
    @CurrentQuery() query: string,
  ) {
    return this.bidService.getMany(qs, query);
  }

  @Query(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard())
  getOneBid(
    @Args({ name: 'input' })
    qs: GetOneInput<Bid>,
    @CurrentQuery() query: string,
  ) {
    return this.bidService.getOne(qs, query);
  }

  @Mutation(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard())
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

  @Query(() => GetBidType)
  @UseGuards(new GraphqlPassportAuthGuard())
  async getMyBidProfile(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Bid>,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    const currentInvestor = await this.bidService.validateInvestor(user);
    console.log(currentInvestor.id);
    const fixedInvestorField = {
      investor: { id: currentInvestor.id },
    };

    const queryString: GetManyInput<Bid> = {
      where: { ...fixedInvestorField },
      order: qs.order,
      pagination: qs.pagination,
    };
    console.log(queryString);
    console.log(query);
    return await this.bidService.getMyBids(queryString, query);
  }

  @Mutation(() => Bid)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteBid(@Args('id') id: number) {
    return this.bidService.delete(id);
  }
}
