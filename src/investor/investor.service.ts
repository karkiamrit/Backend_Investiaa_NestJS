import { Injectable } from '@nestjs/common'
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { InvestorRepository } from './investor.repository'
import { Investor  } from './entities/investor .entity';
import { CreateInvestorInput, UpdateInvestorInput } from './inputs/investor .input';

@Injectable()
export class InvestorService {
constructor(private readonly investorRepository: InvestorRepository) {}

getMany(qs?: RepoQuery<Investor >, query?: string) {
  return this.investorRepository.getMany(qs || {}, query);
}

getOne(qs: OneRepoQuery<Investor >, query?: string) {
  return this.investorRepository.getOne(qs, query);
}

create(input: CreateInvestorInput):Promise<Investor > {
  return this.investorRepository.save(input);
}

createMany(input: CreateInvestorInput[]):Promise<Investor []> {
  return this.investorRepository.save(input);
}

async update(id:number, input: UpdateInvestorInput):Promise<Investor > {
  const investor  = await this.investorRepository.findOne({ where: { id } })
  return this.investorRepository.save({ ...investor , ...input })
}

async delete(id: number) {
  const investor  = this.investorRepository.findOne({ where: { id } })
  await this.investorRepository.delete({ id })
  return investor 
}
}
