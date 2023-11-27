import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { StartupContractRepository } from './startup_contract.repository';
import { StartupContract } from './entities/startup_contract.entity';
import { Bid } from 'src/bid/entities/bid.entity';
import { Entrepreneur } from 'src/entrepreneur/entities/entrepreneur.entity';

@Injectable()
export class StartupContractService {
  constructor(
    private readonly startupContractRepository: StartupContractRepository,
  ) {}

  getOne(qs: OneRepoQuery<StartupContract>, query?: string) {
    return this.startupContractRepository.getOne(qs, query);
  }

  async create(bid: Bid, entrepreneur: Entrepreneur): Promise<StartupContract> {
    const startupContract = new StartupContract();
    startupContract.bid = bid;
    startupContract.entrepreneur = entrepreneur;
    return await this.startupContractRepository.save(startupContract);
  }
}
