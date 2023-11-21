import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';
import { CreateProjectInput, UpdateProjectInput } from './inputs/project.input';
import { User } from 'src/user/entities/user.entity';
import { EntrepreneurService } from 'src/entrepreneur/entrepreneur.service';
import { TeamMember } from './inputs/team_members.input';
import { PriorInvestor } from './inputs/prior_investors';
import { FindOneOptions } from 'typeorm';

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

  async create(input: CreateProjectInput, CurrentUser: User): Promise<Project> {
    try {
      if (CurrentUser.kyc_verified === false) {
        throw new Error(
          `Please complete your KYC verification before registering your startup`,
        );
      }
      const projectdetails = new Project();
      Object.assign(projectdetails, input);
      const currentEntrepreneur =
        await this.entrepreneurService.findEntrepreneurByUserId(CurrentUser.id);
      let team_members = [];
      let prior_investors = [];
      if (input.team_members) {
        team_members = await this.convertTeamMemberToJSON(input.team_members);
      }
      if (input.prior_investors) {
        prior_investors = await this.convertPriorInvestorToJSON(
          input.prior_investors,
        );
      }
      if (!currentEntrepreneur) {
        throw new Error(
          `Please register as an entrepreneur before begining your startup registeration`,
        );
      } else {
        projectdetails.team_members = team_members;
        projectdetails.prior_investors = prior_investors;
        projectdetails.entrepreneur = currentEntrepreneur;
        return await this.projectRepository.save(projectdetails);
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.log(error);
    }
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

  private async convertTeamMemberToJSON(teamMembers: TeamMember[]) {
    const team_members = [];
    let id = 1;
    for (const teamMember of teamMembers) {
      const newTeamMember = new TeamMember();
      Object.assign(newTeamMember, teamMember);
      newTeamMember.id = id;
      team_members.push(newTeamMember);
      id = id + 1;
    }
    return team_members;
  }

  private async convertPriorInvestorToJSON(priorInvestors: PriorInvestor[]) {
    const prior_investors = [];
    let id = 1;
    for (const priorInvestor of priorInvestors) {
      const newPriorInvestor = new PriorInvestor();
      Object.assign(newPriorInvestor, priorInvestor);
      prior_investors.push(newPriorInvestor);
      id = id + 1;
    }
    return prior_investors;
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
