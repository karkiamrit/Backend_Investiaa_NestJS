import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { IncubatorRepository } from './incubator.repository';
import { Incubator } from './entities/incubator.entity';
import {
  CreateIncubatorInput,
  UpdateIncubatorInput,
} from './inputs/incubator.input';
import { FindOneOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class IncubatorService {
  constructor(private readonly incubatorRepository: IncubatorRepository) {}

  getMany(qs?: RepoQuery<Incubator>, query?: string) {
    return this.incubatorRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Incubator>, query?: string) {
    if (query) {
      return this.incubatorRepository.getOne(qs, query);
    } else {
      return this.incubatorRepository.findOne(qs as FindOneOptions<Incubator>);
    }
  }

  create(input: CreateIncubatorInput, currentUser: User): Promise<Incubator> {
    const incubator = new Incubator();
    Object.assign(incubator, input);
    incubator.user = currentUser;
    return this.incubatorRepository.save(incubator);
  }

  async update(id: number, input: UpdateIncubatorInput): Promise<Incubator> {
    const investor = await this.incubatorRepository.findOne({ where: { id } });
    return this.incubatorRepository.save({ ...investor, ...input });
  }

  // createMany(input: CreateIncubatorInput[]): Promise<Incubator[]> {
  //   return this.incubatorRepository.save(input);
  // }

  async delete(id: number) {
    await this.incubatorRepository.delete({ id });
    return { status: 'success' };
  }

  async findIncubatorByUserId(userId: number): Promise<Incubator | null> {
    return await this.incubatorRepository.findIncubatorByUserId(userId);
  }

  async getMyIncubatorProfile(incubatorId: number): Promise<Incubator | null> {
    return await this.incubatorRepository.findOne({
      where: { id: incubatorId },
    });
  }

  async getOneByUserId(userId: number): Promise<Incubator> {
    // Implement a method to get an investor profile by user ID
    return this.incubatorRepository.findOne({
      where: { user: { id: userId } },
    });
  }
}
