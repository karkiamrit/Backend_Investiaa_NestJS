import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';
import { CreateProjectInput, UpdateProjectInput } from './inputs/project.input';
import { User } from 'src/user/entities/user.entity';
import { EntrepreneurService } from 'src/entrepreneur/entrepreneur.service';
import { TeamMember } from './inputs/team_members.input';
import { PriorInvestor } from './inputs/prior_investors';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectdetailsRepository: ProjectRepository,
    private readonly entrepreneurService: EntrepreneurService,
  ) {}

  getMany(qs?: RepoQuery<Project>, query?: string) {
    return this.projectdetailsRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Project>, query?: string) {
    return this.projectdetailsRepository.getOne(qs, query);
  }

  async getProjectProfiles(user: User) {
    const entrepreneur =
      await this.entrepreneurService.findEntrepreneurByUserId(user.id);
    console.log(entrepreneur.id);
    return this.projectdetailsRepository.findProjectsByEntrepreneurId(
      entrepreneur.id,
    );
  }

  private convertTeamMember(teamMembers: TeamMember[]): TeamMember[] {
    let team_members = [];
    for (const teamMember of teamMembers) {
      const newTeamMember = new TeamMember();
      Object.assign(newTeamMember, teamMember);
      team_members.push(newTeamMember);
    }
    return team_members;
  }

  private convertPriorInvestor(
    priorInvestors: PriorInvestor[],
  ): PriorInvestor[] {
    let prior_investors = [];
    for (const priorInvestor of priorInvestors) {
      const newPriorInvestor = new PriorInvestor();
      Object.assign(newPriorInvestor, priorInvestor);
      prior_investors.push(newPriorInvestor);
    }
    return prior_investors;
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
        team_members = this.convertTeamMember(input.team_members);
      }
      if (input.prior_investors) {
        prior_investors = this.convertPriorInvestor(input.prior_investors);
      }
      if (!currentEntrepreneur) {
        throw new Error(
          `Please register as an entrepreneur before begining your startup registeration`,
        );
      } else {
        projectdetails.team_members = team_members;
        projectdetails.prior_investors = prior_investors;

        projectdetails.entrepreneur = currentEntrepreneur;
        return await this.projectdetailsRepository.save(projectdetails);
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.log(error);
    }
  }

  async update(id: number, input: UpdateProjectInput): Promise<Project> {
    const projectdetails = await this.projectdetailsRepository.findOne({
      where: { id },
    });
    if (!projectdetails) {
      throw new Error(`Entrepreneur with ID ${id} not found`);
    }
    Object.assign(projectdetails, input);
    return this.projectdetailsRepository.save(projectdetails);
  }

  async delete(id: number) {
    const project_details = this.projectdetailsRepository.findOne({
      where: { id },
    });
    if (!project_details) {
      throw new Error(`You haven't registered your startup yet`);
    }
    await this.projectdetailsRepository.delete({ id });
    return { status: 'success' };
  }
}
