import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import GraphQLJSON from 'graphql-type-json';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { GetUserType, User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { CurrentUser } from 'src/modules/decorators/query.decorator';
import { SignInGuard } from 'src/modules/guards/graphql-signin-guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => GetUserType)
  // @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyUsers(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<User>,
    @CurrentUser() query: string,
  ) {
    return this.userService.getMany(qs, query);
  }

  @Query(() => User || null)
  // @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneUser(
    @Args({ name: 'input' })
    qs: GetOneInput<User>,
    @CurrentUser() query: string,
  ) {
    return this.userService.getOne(qs, query);
  }

  @Mutation(() => User)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => [User])
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createManyUsers(
    @Args({ name: 'input', type: () => [CreateUserInput] })
    input: CreateUserInput[],
  ) {
    return this.userService.createMany(input);
  }

  @Mutation(() => User)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateUser(@Args('id') id: number, @Args('input') input: UpdateUserInput) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  async updateMe(@CurrentUser() user: User, @Args('input') input: UpdateUserInput) {
    user = await this.userService.getOne({ where: { id: user.id } })
    console.log(user)
    return this.userService.updateProfile(user.id, input);
  }


  @Mutation(() => GraphQLJSON)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteUser(@Args('id') id: number) {
    return this.userService.delete(id);
  }

  @Query(() => User)
  @UseGuards(SignInGuard)
  getMe(@CurrentUser() user: User) {

    return this.userService.getOne({
      where: { id: user.id },
    });
  }
}
