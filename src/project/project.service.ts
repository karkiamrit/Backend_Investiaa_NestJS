import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';
import {
  CreateProjectInputInvestor,
  CreateProjectInputStudent,
  UpdateProjectInput,
} from './inputs/project.input';
import { User } from 'src/user/entities/user.entity';
import { EntrepreneurService } from 'src/entrepreneur/entrepreneur.service';
import { TeamMember } from './inputs/team_members.input';
import { PriorInvestor } from './inputs/prior_investors';
import { FindOneOptions } from 'typeorm';
import { Entrepreneur } from '../entrepreneur/entities/entrepreneur.entity';

@Injectable()
export class ProjectService {
  constructor(
    private readonly entrepreneurService: EntrepreneurService,
    private readonly projectRepository: ProjectRepository,
  ) {}

  getMany(qs?: RepoQuery<Project>, query?: string) {
    return this.projectRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Project>, query?: string) {
    if (query) {
      this;
      return this.projectRepository.getOne(qs, query);
    } else {
      return Project.findOne(qs as FindOneOptions<Project>);
    }
  }

  async getProjectProfiles(user: User) {
    const entrepreneur =
      await this.entrepreneurService.findEntrepreneurByUserId(user.id);
    if (!entrepreneur) {
      throw new Error(`You haven't registered your startup yet`);
    }
    return this.projectRepository.findProjectsByEntrepreneurId(entrepreneur.id);
  }

  async create(
    input: any,
    currentUser: User,
    currentEntrepreneur: Entrepreneur,
  ): Promise<Project | undefined> {
    try {
      this.validateKYCVerification(currentUser);

      const projectdetails = this.createProjectDetails(input);
      const teamMembers = await this.convertEntitiesToJSON(
        input.team_members,
        TeamMember,
      );
      const priorInvestors = await this.convertEntitiesToJSON(
        input.prior_investors,
        PriorInvestor,
      );

      if (!currentEntrepreneur) {
        throw new Error(
          `Please register as an entrepreneur before beginning your startup registration`,
        );
      }

      projectdetails.team_members = teamMembers;
      projectdetails.prior_investors = priorInvestors;
      projectdetails.entrepreneur = currentEntrepreneur;

      return await this.projectRepository.save(projectdetails);
    } catch (error) {
      // Handle any unexpected errors here
      console.log(error);
      return undefined;
    }
  }

  private validateKYCVerification(currentUser: User): void {
    if (!currentUser.kyc_verified) {
      throw new Error(
        `Please complete your KYC verification before registering your startup`,
      );
    }
  }

  private createProjectDetails(input: CreateProjectInputInvestor): Project {
    const projectdetails = new Project();
    Object.assign(projectdetails, input);
    return projectdetails;
  }

  async update(id: number, input: UpdateProjectInput): Promise<Project> {
    const projectdetails = await this.projectRepository.findOne({
      where: { id },
    });
    if (!projectdetails) {
      throw new Error(`Entrepreneur with ID ${id} not found`);
    }
    Object.assign(projectdetails, input);
    return this.projectRepository.save(projectdetails);
  }

  async delete(id: number) {
    const project_details = this.projectRepository.findOne({
      where: { id },
    });
    if (!project_details) {
      throw new Error(`You haven't registered your startup yet`);
    }
    console.log(project_details);
    console.log('id', id);
    await this.projectRepository.delete({ id });
    return { status: 'success' };
  }

  async checkForStudent(currentEntrepreneur: Entrepreneur, input: any) {
    let projectInput: any;
    if (currentEntrepreneur?.is_student) {
      projectInput = Object.assign(new CreateProjectInputStudent(), input);
    } else {
      projectInput = Object.assign(new CreateProjectInputInvestor(), input);
      if (
        !input.adhoc_file ||
        !input.registeration_docs ||
        !input.tax_clearence_docs ||
        !input.financial_projection_docs
      ) {
        throw new Error(`Please upload all the required documents`);
      }
    }
    return projectInput;
  }

  // private async convertTeamMemberToJSON(teamMembers: TeamMember[]) {
  //   const team_members = [];
  //   let id = 1;
  //   for (const teamMember of teamMembers) {
  //     const newTeamMember = new TeamMember();
  //     Object.assign(newTeamMember, teamMember);
  //     newTeamMember.id = id;
  //     team_members.push(newTeamMember);
  //     id = id + 1;
  //   }
  //   return team_members;
  // }

  // private async convertPriorInvestorToJSON(priorInvestors: PriorInvestor[]) {
  //   const prior_investors = [];
  //   let id = 1;
  //   for (const priorInvestor of priorInvestors) {
  //     const newPriorInvestor = new PriorInvestor();
  //     Object.assign(newPriorInvestor, priorInvestor);
  //     prior_investors.push(newPriorInvestor);
  //     id = id + 1;
  //   }
  //   return prior_investors;
  // }

  private async convertEntitiesToJSON(entities: any[], entityClass: any) {
    const convertedEntities = [];
    let id = 1;
    for (const entity of entities) {
      const newEntity = new entityClass();
      Object.assign(newEntity, entity);
      newEntity.id = id;
      convertedEntities.push(newEntity);
      id = id + 1;
    }
    return convertedEntities;
  }

  async validateEntrepreneur(user: User) {
    const currentEntrepreneur =
      await this.entrepreneurService.findEntrepreneurByUserId(user.id);
    if (!currentEntrepreneur) {
      throw new Error('You cannot bid on a project if you are not an investor');
    }
    return currentEntrepreneur;
  }

  async validateProject(query: string, user: User, id: number) {
    const currentInvestor = await this.validateEntrepreneur(user);
    const myProjects = await this.getMany(
      { where: { entrepreneur: { id: currentInvestor.id } } },
      query,
    );
    const selectedProject = await this.getOne({ where: { id: id } }, query);
    if (selectedProject === null) {
      throw new Error('Project does not exist');
    }
    const bidArray = myProjects.data as Project[];
    if (!bidArray.some((project) => project.id === selectedProject.id)) {
      throw new Error('You are not allowed to update this project');
    }
  }
}
