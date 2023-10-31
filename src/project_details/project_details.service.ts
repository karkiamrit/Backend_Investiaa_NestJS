import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { Project_detailsRepository } from './project_details.repository';
import { Project_details } from './entities/project_details.entity';
import {
  CreateProject_detailsInput,
  UpdateProject_detailsInput,
} from './inputs/project_details.input';
import { User } from 'src/user/entities/user.entity';
import { EntrepreneurRepository } from 'src/entrepreneur/entrepreneur.repository';

@Injectable()
export class Project_detailsService {
  constructor(
    private readonly project_detailsRepository: Project_detailsRepository,
    private readonly entrepreneur_Repository: EntrepreneurRepository,
  ) {}

  getMany(qs?: RepoQuery<Project_details>, query?: string) {
    return this.project_detailsRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Project_details>, query?: string) {
    return this.project_detailsRepository.getOne(qs, query);
  }

  async create(
    data: CreateProject_detailsInput,
    CurrentUser: User,
  ): Promise<Project_details> {
    try {
      const projectdetails = new Project_details();
      Object.assign(projectdetails, data);
      const currentEntrepreneur =
        await this.entrepreneur_Repository.findEntrepreneurByUserId(
          CurrentUser.id,
        );
      if (!currentEntrepreneur) {
        throw new Error(
          `Please register as an entrepreneur before creating your project`,
        );
      }else{
        return await this.project_detailsRepository.save(projectdetails);
      }
      
    } catch (error) {
      // Handle any unexpected errors here
      console.log(error);
    }
  }

  async update(
    id: number,
    input: UpdateProject_detailsInput,
  ): Promise<Project_details> {
    const entrepreneur = await this.project_detailsRepository.findOne({
      where: { id },
    });
    if (!entrepreneur) {
      throw new Error(`Entrepreneur with ID ${id} not found`);
    }
    Object.assign(entrepreneur, input);
    return this.project_detailsRepository.save(entrepreneur);
  }

  async delete(id: number) {
    const project_details = this.project_detailsRepository.findOne({
      where: { id },
    });
    await this.project_detailsRepository.delete({ id });
    return project_details;
  }
}
