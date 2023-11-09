import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { BidRepository } from './bid.repository';
import { Bid } from './entities/bid.entity';
import { CreateBidInput, UpdateBidInput } from './inputs/bid.input';
import { User } from '../user/entities/user.entity';
import { InvestorService } from '../investor/investor.service';
import { ProjectRepository } from '../project/project.repository';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/entities/project.entity';
import { Investor } from '../investor/entities/investor.entity';

@Injectable()
export class BidService {
  constructor(
    private readonly bidRepository: BidRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly investorService: InvestorService,
    private readonly projectService: ProjectService,
  ) {}

  getMany(qs?: RepoQuery<Bid>, query?: string) {
    return this.bidRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Bid>, query?: string) {
    return this.bidRepository.getOne(qs, query);
  }

  async create(
    input: CreateBidInput,
    projectID: number,
    user: User,
  ): Promise<Bid> {
    if (!user.kyc_verified) {
      throw new Error(
        'You cannot bid on a project if you are not KYC verified',
      );
    }
    const currentInvestor = await this.validateInvestor(user);
    const selectedProject = await this.validateSelectedProject(projectID, user);
    const bid = new Bid();
    Object.assign(bid, input);
    bid.investor = currentInvestor;
    bid.project = selectedProject;
    return this.bidRepository.save(bid);
  }

  createMany(input: CreateBidInput[]): Promise<Bid[]> {
    return this.bidRepository.save(input);
  }

  async update(id: number, input: UpdateBidInput): Promise<Bid> {
    const bid = await this.bidRepository.findOne({ where: { id } });
    return this.bidRepository.save({ ...bid, ...input });
  }

  async delete(id: number) {
    const bid = this.bidRepository.findOne({ where: { id } });
    await this.bidRepository.delete({ id });
    return bid;
  }

  async validateInvestor(user: User) {
    const currentInvestor = await this.investorService.findInvestorByUserId(
      user.id,
    );
    if (!currentInvestor) {
      throw new Error('You cannot bid on a project if you are not an investor');
    }
    return currentInvestor;
  }

  async validateSelectedProject(projectID: number, user: User) {
    let myProject = [];
    myProject = await this.projectService.getProjectProfiles(user);
    const selectedProject = await Project.findOne({
      where: { id: projectID },
    });

    if (!selectedProject) {
      throw new Error('Project not found');
    }
    const projectExists = myProject.some(
      (project) => project.id === selectedProject.id,
    );
    if (projectExists) {
      throw new Error('You cannot bid on your own project');
    }
    return selectedProject;
  }

  async validateBid(query: string, user: User, id: number) {
    const currentInvestor = await this.validateInvestor(user);
    let myBids = await this.getMany(
      { where: { investor: { id: currentInvestor.id } } },
      query,
    );
    let selectedBid = await this.getOne({ where: { id: id } }, query);
    if (selectedBid === null) {
      throw new Error('Bid does not exist');
    }
    const bidArray = myBids.data as Bid[];
    if (!bidArray.some((bid) => bid.id === selectedBid.id)) {
      throw new Error('You are not allowed to update this bid');
    }
  }
}
