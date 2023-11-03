import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';
import { CreateProjectInput, UpdateProjectInput } from './inputs/project.input';
import { User } from 'src/user/entities/user.entity';
import { EntrepreneurService } from 'src/entrepreneur/entrepreneur.service';

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

  async getProjectProfile(user: User) {
    const entrepreneur =
      await this.entrepreneurService.findEntrepreneurByUserId(user.id);
    return this.projectdetailsRepository.findOne({
      where: { entrepreneur: { id: entrepreneur.id } },
    });
  }

  async create(input: CreateProjectInput, CurrentUser: User): Promise<Project> {
    try {
      const projectdetails = new Project();
      Object.assign(projectdetails, input);
      const currentEntrepreneur =
        await this.entrepreneurService.findEntrepreneurByUserId(CurrentUser.id);

      if (!currentEntrepreneur) {
        throw new Error(
          `Please register as an entrepreneur before begining your startup registeration`,
        );
      } else {
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
