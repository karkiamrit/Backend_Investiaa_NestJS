import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { StartupInvestmentRepository } from './startup_investment.repository';
import { StartupInvestment } from './entities/startup_investment.entity';
import { Bid } from 'src/bid/entities/bid.entity';
import { Entrepreneur } from 'src/entrepreneur/entities/entrepreneur.entity';

@Injectable()
export class StartupInvestmentService {
  constructor(
    private readonly startupInvestmentRepository: StartupInvestmentRepository,
  ) {}

  getOne(qs: OneRepoQuery<StartupInvestment>, query?: string) {
    return this.startupInvestmentRepository.getOne(qs, query);
  }

  async create(
    bid: Bid,
    entrepreneur: Entrepreneur,
  ): Promise<StartupInvestment> {
    const startupInvestment = new StartupInvestment();
    startupInvestment.bid = bid;
    startupInvestment.entrepreneur = entrepreneur;
    return await this.startupInvestmentRepository.save(startupInvestment);
  }
}
