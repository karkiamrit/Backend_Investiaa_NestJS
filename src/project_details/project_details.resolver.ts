// import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
// import { UseGuards } from '@nestjs/common';
// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { Project_detailsService } from './project_details.service';
// import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
// import { CurrentQuery } from 'src/modules/decorators/query.decorator';
// import {
//   GetProject_detailsType,
//   Project_details,
// } from './entities/project_details.entity';
// import {
//   CreateProject_detailsInput,
//   UpdateProject_detailsInput,
// } from './inputs/project_details.input';
// import { User } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';
// @Resolver()
// export class Project_detailsResolver {
//   constructor(
//     private readonly user_Service: UserService,
//     private readonly project_detailsService: Project_detailsService,
//   ) {}

//   @Query(() => GetProject_detailsType)
//   @UseGuards(new GraphqlPassportAuthGuard('admin'))
//   getManyProject_detailss(
//     @Args({ name: 'input', nullable: true })
//     qs: GetManyInput<Project_details>,
//     @CurrentQuery() query: string,
//   ) {
//     return this.project_detailsService.getMany(qs, query);
//   }

//   @Query(() => Project_details)
//   @UseGuards(new GraphqlPassportAuthGuard('admin'))
//   getOneProject_details(
//     @Args({ name: 'input' })
//     qs: GetOneInput<Project_details>,
//     @CurrentQuery() query: string,
//   ) {
//     return this.project_detailsService.getOne(qs, query);
//   }

//   @Mutation(() => Project_details)
//   // @UseGuards(new GraphqlPassportAuthGuard('admin'))
//   async createProject_details(@Args('input') input: CreateProject_detailsInput,  @CurrentQuery() user: User) {
//     const currentUser = await this.user_Service.getOne({
//       where: { id: user.id },
//     });
//     return this.project_detailsService.create(input, currentUser);
//   }


//   @Mutation(() => Project_details)
//   @UseGuards(new GraphqlPassportAuthGuard('admin'))
//   updateProject_details(
//     @Args('id') id: number,
//     @Args('input') input: UpdateProject_detailsInput,
//   ) {
//     return this.project_detailsService.update(id, input);
//   }

//   @Mutation(() => Project_details)
//   @UseGuards(new GraphqlPassportAuthGuard('admin'))
//   deleteProject_details(@Args('id') id: number) {
//     return this.project_detailsService.delete(id);
//   }
// }
