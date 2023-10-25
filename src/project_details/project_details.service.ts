import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { Project_detailsRepository } from './project_details.repository';
import { Project_details } from './entities/project_details.entity';
import {
  CreateProject_detailsInput,
  UpdateProject_detailsInput,
} from './inputs/project_details.input';

@Injectable()
export class Project_detailsService {
  constructor(
    private readonly project_detailsRepository: Project_detailsRepository,
  ) {}

  getMany(qs?: RepoQuery<Project_details>, query?: string) {
    return this.project_detailsRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Project_details>, query?: string) {
    return this.project_detailsRepository.getOne(qs, query);
  }

  create(input: CreateProject_detailsInput): Promise<Project_details> {
    return this.project_detailsRepository.save(input);
  }

  createMany(input: CreateProject_detailsInput[]): Promise<Project_details[]> {
    return this.project_detailsRepository.save(input);
  }

  async update(
    id: number,
    input: UpdateProject_detailsInput,
  ): Promise<Project_details> {
    const project_details = await this.project_detailsRepository.findOne({
      where: { id },
    });
    return this.project_detailsRepository.save({
      ...project_details,
      ...input,
    });
  }

  async delete(id: number) {
    const project_details = this.project_detailsRepository.findOne({
      where: { id },
    });
    await this.project_detailsRepository.delete({ id });
    return project_details;
  }
}
