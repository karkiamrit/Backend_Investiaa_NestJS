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

  async getOne(qs: OneRepoQuery<User>, query?: string) {
    console.log('getone' + this.userRepository.target)
    return this.userRepository.getOne(qs, query);
  }

  getMany(qs?: RepoQuery<User>, query?: string) {
    console.log(this.userRepository.target)
    return this.userRepository.getMany(qs || {}, query);

  }

  async create(input: CreateUserInput | SignUpInput): Promise<User> {
    return User.save(Object.assign(new User(), input));
  }

  createMany(input: CreateUserInput[]): Promise<User[]> {
    return this.userRepository.save(input);
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    const user = await User.findOne({ where: { id } });
    return User.save({ ...user, ...input });
  }

  async updateProfile(id: number, input: UpdateUserInput): Promise<User> {
    const user = await User.findOne({ where: { id } });
    return User.save({ ...user, ...input });
  }

  async delete(id: number) {
    const { affected } = await this.userRepository.delete({ id });
    return { status: affected > 0 ? 'success' : 'fail' };
  }
}
