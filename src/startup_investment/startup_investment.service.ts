import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { Startup_investmentRepository } from './startup_investment.repository';
import { Startup_investment } from './entities/startup_investment.entity';
import {
  CreateStartup_investmentInput,
  UpdateStartup_investmentInput,
} from './inputs/startup_investment.input';

@Injectable()
export class Startup_investmentService {
  constructor(
    private readonly startup_investmentRepository: Startup_investmentRepository,
  ) {}

  getMany(qs?: RepoQuery<Startup_investment>, query?: string) {
    return this.startup_investmentRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Startup_investment>, query?: string) {
    return this.startup_investmentRepository.getOne(qs, query);
  }

  create(input: CreateStartup_investmentInput): Promise<Startup_investment> {
    return this.startup_investmentRepository.save(input);
  }

  createMany(
    input: CreateStartup_investmentInput[],
  ): Promise<Startup_investment[]> {
    return this.startup_investmentRepository.save(input);
  }

  async update(
    id: number,
    input: UpdateStartup_investmentInput,
  ): Promise<Startup_investment> {
    const startup_investment = await this.startup_investmentRepository.findOne({
      where: { id },
    });
    return this.startup_investmentRepository.save({
      ...startup_investment,
      ...input,
    });
  }

  async delete(id: number) {
    const startup_investment = this.startup_investmentRepository.findOne({
      where: { id },
    });
    await this.startup_investmentRepository.delete({ id });
    return startup_investment;
  }
}
