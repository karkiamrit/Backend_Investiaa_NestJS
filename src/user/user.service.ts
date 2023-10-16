import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpInput } from 'src/auth/inputs/auth.input';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './inputs/user.input';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  getOne(qs: OneRepoQuery<User>, query?: string) {
    if (query) {
      return this.userRepository.getOne(qs, query);
    }
    else {
      return this.userRepository.findOne(qs as FindOneOptions<User>);
    }
  }

  getMany(qs?: RepoQuery<User>, query?: string) {
    return this.userRepository.getMany(qs || {}, query);
  }

  async create(input: CreateUserInput | SignUpInput): Promise<User> {
    return this.userRepository.save(Object.assign(new User(), input));
  }

  createMany(input: CreateUserInput[]): Promise<User[]> {
    return this.userRepository.save(input);
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.save({ ...user, ...input });
  }

  async delete(id: string) {
    const { affected } = await this.userRepository.delete({ id });
    return { status: affected > 0 ? 'success' : 'fail' };
  }
}
