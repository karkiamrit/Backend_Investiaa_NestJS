import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { EntrepreneurRepository } from './entrepreneur.repository';
import { Entrepreneur } from './entities/entrepreneur.entity';
import {
  CreateEntrepreneurInput,
  UpdateEntrepreneurInput,
} from './inputs/entrepreneur.input';
import { User } from 'src/user/entities/user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class EntrepreneurService {
  constructor(
    private readonly entrepreneurRepository: EntrepreneurRepository,
  ) { }

  getMany(qs?: RepoQuery<Entrepreneur>, query?: string) {
    return this.entrepreneurRepository.getMany(qs || {}, query);
  }

  async getOne(qs: OneRepoQuery<Entrepreneur>, query?: string) {
    if (query) {
      return this.entrepreneurRepository.getOne(qs, query);
    } else {
      return Entrepreneur.findOne(qs as FindOneOptions<Entrepreneur>);
    }
  }

  create(input: CreateEntrepreneurInput, currentUser: User): Promise<Entrepreneur> {
    const entrepreneur = new Entrepreneur();
    Object.assign(entrepreneur, input);
    entrepreneur.user = currentUser;
    return this.entrepreneurRepository.save(entrepreneur);
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
    if (!entrepreneur) {
      throw new Error(`Entrepreneur with ID ${id} not found`);
    }
    Object.assign(entrepreneur, input);
    return this.entrepreneurRepository.save(entrepreneur);
  }

  async delete(id: number) {
    // const entrepreneur = this.entrepreneurRepository.findOne({ where: { id } });
    await this.entrepreneurRepository.delete({ id });
    return { status: 'success' };
  }

  async getOneByUserId(userId: number): Promise<Entrepreneur> {
    // Implement a method to get an entrepreneur profile by user ID
    return this.entrepreneurRepository.findOne({ where: { user: { id: userId } } });
  }
}
