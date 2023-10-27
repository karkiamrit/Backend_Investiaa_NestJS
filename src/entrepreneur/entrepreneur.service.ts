import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { EntrepreneurRepository } from './entrepreneur.repository';
import { Entrepreneur } from './entities/entrepreneur.entity';
import {
  CreateEntrepreneurInput,
  UpdateEntrepreneurInput,
} from './inputs/entrepreneur.input';

@Injectable()
export class EntrepreneurService {
  constructor(
    private readonly entrepreneurRepository: EntrepreneurRepository,
  ) {}

  getMany(qs?: RepoQuery<Entrepreneur>, query?: string) {
    return this.entrepreneurRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Entrepreneur>, query?: string) {
    return this.entrepreneurRepository.getOne(qs, query);
  }

  create(input: CreateEntrepreneurInput): Promise<Entrepreneur> {
    return this.entrepreneurRepository.save(input);
  }

  createMany(input: CreateEntrepreneurInput[]): Promise<Entrepreneur[]> {
    return this.entrepreneurRepository.save(input);
  }

  async update(
    id: number,
    input: UpdateEntrepreneurInput,
  ): Promise<Entrepreneur> {
    const entrepreneur = await this.entrepreneurRepository.findOne({
      where: { id },
    });
    return this.entrepreneurRepository.save({ ...entrepreneur, ...input });
  }

  async delete(id: number) {
    const entrepreneur = this.entrepreneurRepository.findOne({ where: { id } });
    await this.entrepreneurRepository.delete({ id });
    return entrepreneur;
  }
}
