import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { KycService } from './kyc.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetKycType, Kyc } from './entities/kyc.entity';
import { CreateKycInput, UpdateKycInput } from './inputs/kyc.input';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
@Resolver()
export class KycResolver {
  constructor(private readonly kycService: KycService) {}

  @Query(() => GetKycType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyKycs(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Kyc>,
    @CurrentQuery() query: string,
  ) {
    return this.kycService.getMany(qs, query);
  }

  @Query(() => Kyc)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneKyc(
    @Args({ name: 'input' })
    qs: GetOneInput<Kyc>,
    @CurrentQuery() query: string,
  ) {
    return this.kycService.getOne(qs, query);
  }

  @Mutation(() => Kyc)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  createKyc(@Args('input') input: CreateKycInput, @CurrentUser() user: User) {
    return this.kycService.create(input, user);
  }

  @Mutation(() => Kyc)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateKyc(@Args('id') id: number, @Args('input') input: UpdateKycInput) {
    return this.kycService.update(id, input);
  }

  @Mutation(() => Kyc)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteKyc(@Args('id') id: number) {
    return this.kycService.delete(id);
  }
}
