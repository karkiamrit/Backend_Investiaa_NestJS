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
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Resolver()
export class EntrepreneurResolver {
  constructor(private readonly entrepreneurService: EntrepreneurService,
    private readonly userService: UserService

  ) { }

  @Query(() => GetEntrepreneurType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyEntrepreneurs(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Entrepreneur>,
    @CurrentQuery() query: string,
  ) {
    return this.entrepreneurService.getMany(qs, query);
  }

  @Query(() => Entrepreneur || null)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneEntrepreneur(
    @Args({ name: 'input' })
    qs: GetOneInput<Entrepreneur>,
    @CurrentQuery() query: string,
  ) {
    return this.entrepreneurService.getOne(qs, query);
  }

  @Mutation(() => Entrepreneur)
  async createEntrepreneur(@Args('input') input: CreateEntrepreneurInput,
    @CurrentQuery() user: User) {

    const currentUser = await this.userService.getOne({ where: { id: user.id } })
    currentUser.type.push('ENTREPRENEUR')
    return await this.entrepreneurService.create(input, currentUser);
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

  @Mutation(() => Entrepreneur)
  async updateEntrepreneurProfile(
    @Args('input') input: UpdateEntrepreneurInput,
    @CurrentQuery() user: User, // Assuming user context is available
  ) {
    const currentUser = await this.userService.getOne({ where: { id: user.id } })
    const entrepreneur = await this.entrepreneurService.getOneByUserId(currentUser.id);
    if (!entrepreneur) {
      throw new Error('Entrepreneur profile not found for the user.');
    }

    // Check if the user owns the profile
    if (entrepreneur.user.id !== currentUser.id) {
      throw new Error('Unauthorized to update this profile.');
    }

    // Update the profile
    return this.entrepreneurService.update(entrepreneur.id, input);
  }

  @Mutation(() => Entrepreneur)
  async deleteEntrepreneurProfile(
    @CurrentQuery() user: User, // Assuming user context is available
  ) {
    const currentUser = await this.userService.getOne({ where: { id: user.id } })
    const entrepreneur = await this.entrepreneurService.getOneByUserId(currentUser.id);

    if (!entrepreneur) {
      throw new Error('Entrepreneur profile not found for the user.');
    }

    // Check if the user owns the profile
    if (entrepreneur.user.id !== currentUser.id) {
      throw new Error('Unauthorized to delete this profile.');
    }


    // Delete the profile
    return this.entrepreneurService.delete(entrepreneur.id);
  }
}
