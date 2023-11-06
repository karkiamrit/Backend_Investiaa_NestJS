import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InvestorService } from './investor.service'
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetInvestorType, Investor  } from './entities/investor .entity';
import { CreateInvestorInput, UpdateInvestorInput } from './inputs/investor .input';
@Resolver()
export class InvestorResolver {
constructor(private readonly investorService: InvestorService) {}

@Query(() => GetInvestorType)
@UseGuards(new GraphqlPassportAuthGuard('admin'))
getManyInvestors(
  @Args({ name: 'input', nullable: true })
  qs: GetManyInput<Investor >,
  @CurrentQuery() query: string,
) {
  return this.investorService.getMany(qs, query);
}

@Query(() => Investor )
@UseGuards(new GraphqlPassportAuthGuard('admin'))
getOneInvestor (
  @Args({ name: 'input' })
  qs: GetOneInput<Investor >,
  @CurrentQuery() query: string,
) {
  return this.investorService.getOne(qs, query);
}

@Mutation(() => Investor )
@UseGuards(new GraphqlPassportAuthGuard('admin'))
createInvestor (@Args('input') input: CreateInvestorInput) {
  return this.investorService.create(input);
}

@Mutation(()=> [Investor ])
@UseGuards(new GraphqlPassportAuthGuard('admin'))
createManyInvestor (
  @Args({ name: 'input', type: () => [CreateInvestorInput] })
  input: CreateInvestorInput[],
) {
  return this.investorService.createMany(input);
}

@Mutation(() => Investor )
@UseGuards(new GraphqlPassportAuthGuard('admin'))
updateInvestor (@Args('id') id: number, @Args('input') input: UpdateInvestorInput) {
  return this.investorService.update(id, input);
}

@Mutation(() => Investor )
@UseGuards(new GraphqlPassportAuthGuard('admin'))
deleteInvestor (@Args('id') id: number) {
  return this.investorService.delete(id);
}
}
