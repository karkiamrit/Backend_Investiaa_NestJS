import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { InvestorRepository } from './investor.repository';
import { Investor } from './entities/investor.entity';
import {
  CreateInvestorInput,
  UpdateInvestorInput,
} from './inputs/investor.input';
import { User } from '../user/entities/user.entity';
import { PriorInvestment } from './inputs/prior_investment.type';

@Injectable()
export class InvestorService {
  constructor(private readonly investorRepository: InvestorRepository) {}

  getMany(qs?: RepoQuery<Investor>, query?: string) {
    return this.investorRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Investor>, query?: string) {
    return this.investorRepository.getOne(qs, query);
  }

  private convertPriorInvestmentToJSON(priorInvestments: PriorInvestment[]) {
    const prior_investments = [];
    let id = 1;
    for (const priorInvestment of priorInvestments) {
      const newPriorInvestment = new PriorInvestment();
      priorInvestment.id = id;
      Object.assign(newPriorInvestment, priorInvestment);
      prior_investments.push(newPriorInvestment);
      id = id + 1;
    }
    return prior_investments;
  }

  create(input: CreateInvestorInput, currentUser: User): Promise<Investor> {
    let prior_investments = [];
    if (input.prior_investments) {
      prior_investments = this.convertPriorInvestmentToJSON(
        input.prior_investments,
      );
    }

    const investor = new Investor();
    Object.assign(investor, input);
    investor.user = currentUser;
    investor.prior_investments = prior_investments;
    return this.investorRepository.save(investor);
  }

  // createMany(input: CreateInvestorInput[]): Promise<Investor[]> {
  //   return this.investorRepository.save(input);
  // }

  async update(id: number, input: UpdateInvestorInput): Promise<Investor> {
    const investor = await this.investorRepository.findOne({ where: { id } });
    return this.investorRepository.save({ ...investor, ...input });
  }

  async delete(id: number) {
    await this.investorRepository.delete({ id });
    return { status: 'success' };
  }

  async findInvestorByUserId(userId: number): Promise<Investor | null> {
    return await this.investorRepository.findInvestorByUserId(userId);
  }

  async getMyInvestorProfile(investorId: number): Promise<Investor | null> {
    return await this.investorRepository.findOne({
      where: { id: investorId },
    });
  }

  async getOneByUserId(userId: number): Promise<Investor> {
    // Implement a method to get an investor profile by user ID
    return this.investorRepository.findOne({
      where: { user: { id: userId } },
    });
  }
}
