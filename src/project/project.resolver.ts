import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { Project, GetProjectType } from './entities/project.entity';
import {
  CreateProjectInputInvestor,
  CreateProjectInputStudent,
  CreateProjectInputIncubator,
  UpdateProjectInput,
} from './inputs/project.input';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { EntrepreneurService } from '../entrepreneur/entrepreneur.service';

@Resolver()
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly entrepreneurService: EntrepreneurService,
  ) {}

  @Query(() => GetProjectType)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  getManyProjects(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Project>,
    @CurrentQuery() query: string,
  ) {
    return this.projectService.getMany(qs, query);
  }

  @Query(() => Project)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneProject(
    @Args({ name: 'input' })
    qs: GetOneInput<Project>,
    @CurrentQuery() query: string,
  ) {
    return this.projectService.getOne(qs, query);
  }

  // @Mutation(() => Project)
  // @UseGuards(new GraphqlPassportAuthGuard())
  // async createProject(
  //   // @Args('input') input: CreateProjectInput,
  //   @CurrentUser() user: User,
  // ) {
  //   return this.projectService.create(input, user);
  // }

  @Mutation(() => Project, {
    description: 'Apply for investment by creating this project',
  })
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async createProjectforInvestor(
    @Args('input', { type: () => GraphQLJSONObject }) input: any,
    @CurrentUser() user: User,
  ) {
    let projectInput: any;
    const currentEntrepreneur =
      await this.entrepreneurService.findEntrepreneurByUserId(user.id);
    // Check if the user is a student
    projectInput = await this.projectService.checkForStudent(
      currentEntrepreneur,
      input,
    );

    return this.projectService.create(projectInput, user, currentEntrepreneur);
  }

  @Mutation(() => Project, {
    description: 'Apply for incubation by creating project',
  })
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async createProjectforIncubator(
    @Args('input') input: CreateProjectInputIncubator,
    @CurrentUser() user: User,
  ) {
    const currentEntrepreneur =
      await this.entrepreneurService.findEntrepreneurByUserId(user.id);
    return this.projectService.create(input, user, currentEntrepreneur);
  }

  @Mutation(() => Project)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateProject(
    @Args('id') id: number,
    @Args('input') input: UpdateProjectInput,
  ) {
    return this.projectService.update(id, input);
  }

  @Mutation(() => GraphQLJSON)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  deleteProject(@Args('id') id: number) {
    return this.projectService.delete(id);
  }

  @Query(() => [Project])
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  getProjectProfiles(@CurrentUser() user: User) {
    return this.projectService.getProjectProfiles(user);
  }

  @Query(() => GetProjectType)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async getMyProjectProfile(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Project>,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    const currentEntrepreneur =
      await this.projectService.validateEntrepreneur(user);
    const fixedEntrepreneurField = {
      entrepreneur: { id: currentEntrepreneur.id },
    };

    const queryString: GetManyInput<Project> = {
      where: { ...fixedEntrepreneurField },
      order: qs.order,
      pagination: qs.pagination,
    };
    return await this.projectService.getMany(queryString, query);
  }

  @Mutation(() => Project)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async updateProjectProfile(
    @Args('id') id: number,
    @Args('input') input: UpdateProjectInput,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    await this.projectService.validateProject(query, user, id);
    return this.projectService.update(id, input);
  }

  @Mutation(() => Project)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async deleteProjectProfile(
    @Args('id') id: number,
    @CurrentUser() user: User,
    @CurrentQuery() query: string,
  ) {
    await this.projectService.validateProject(query, user, id);
    return this.projectService.delete(id);
  }
}
