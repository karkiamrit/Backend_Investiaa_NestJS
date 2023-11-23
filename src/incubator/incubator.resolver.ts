import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncubatorService } from './incubator.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetIncubatorType, Incubator } from './entities/incubator.entity';
import {
  CreateIncubatorInput,
  UpdateIncubatorInput,
} from './inputs/incubator.input';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import GraphQLJSON from 'graphql-type-json';
@Resolver()
export class IncubatorResolver {
  constructor(private readonly incubatorService: IncubatorService) {}

  @Query(() => GetIncubatorType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyIncubators(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Incubator>,
    @CurrentQuery() query: string,
  ) {
    return this.incubatorService.getMany(qs, query);
  }

  @Query(() => Incubator || null)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneIncubator(
    @Args({ name: 'input' })
    qs: GetOneInput<Incubator>,
    @CurrentQuery() query: string,
  ) {
    return this.incubatorService.getOne(qs, query);
  }

  @Mutation(() => Incubator)
  @UseGuards(new GraphqlPassportAuthGuard())
  createIncubator(
    @Args('input') input: CreateIncubatorInput,
    @CurrentUser() user: User,
  ) {
    return this.incubatorService.create(input, user);
  }

  // @Mutation(() => [Incubator])
  // @UseGuards(new GraphqlPassportAuthGuard('admin'))
  // createManyIncubator(
  //   @Args({ name: 'input', type: () => [CreateIncubatorInput] })
  //   input: CreateIncubatorInput[],
  // ) {
  //   return this.incubatorService.createMany(input);
  // }

  @Mutation(() => Incubator)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateIncubator(
    @Args('id') id: number,
    @Args('input') input: UpdateIncubatorInput,
  ) {
    return this.incubatorService.update(id, input);
  }

  @Mutation(() => Incubator)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteIncubator(@Args('id') id: number) {
    return this.incubatorService.delete(id);
  }

  @Mutation(() => Incubator)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async updateIncubatorProfile(
    @Args('input') input: UpdateIncubatorInput,
    @CurrentUser() user: User,
  ) {
    const incubator = await this.incubatorService.getOneByUserId(user.id);
    if (!incubator) {
      throw new Error('Incubator profile not found for the user.');
    }

    // Check if the user owns the profile
    if (incubator.user.id !== user.id) {
      throw new Error('Unauthorized to update this profile.');
    }

    // Update the profile
    return this.incubatorService.update(incubator.id, input);
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async deleteIncubatorProfile(@CurrentUser() user: User) {
    const incubator = await this.incubatorService.getOneByUserId(user.id);
    if (!incubator) {
      throw new Error('Incubator profile not found for the user.');
    }

    // Check if the user owns the profile
    if (incubator.user.id !== user.id) {
      throw new Error('Unauthorized to delete this profile.');
    }

    // Delete the profile
    this.incubatorService.delete(incubator.id);

    return { status: 'success' };
  }

  @Query(() => Incubator || null)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async getMyIncubatorProfile(@CurrentUser() user: User) {
    const incubator = await this.incubatorService.findIncubatorByUserId(
      user.id,
    );
    if (!incubator) {
      throw new Error('Incubator profile not found for the user.');
    }
    return this.incubatorService.getMyIncubatorProfile(incubator.id);
  }
}
