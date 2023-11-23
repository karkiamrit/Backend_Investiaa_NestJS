import { Inject, Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { BidRepository } from './bid.repository';
import { Bid } from './entities/bid.entity';
import { CreateBidInput, UpdateBidInput } from './inputs/bid.input';
import { User } from '../user/entities/user.entity';
import { InvestorService } from '../investor/investor.service';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/entities/project.entity';
import { FindOneOptions } from 'typeorm';
import { StartupInvestmentService } from 'src/startup_investment/startup_investment.service';
import { IncubatorService } from '../incubator/incubator.service';

@Injectable()
export class BidService {
  constructor(
    private readonly bidRepository: BidRepository,
    private readonly investorService: InvestorService,
    private readonly projectService: ProjectService,
    private readonly startupInvestmentService: StartupInvestmentService,
    private readonly incubatorService: IncubatorService,
  ) {}

  getMany(qs?: RepoQuery<Bid>, query?: string) {
    return this.bidRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Bid>, query?: string) {
    if (query) {
      return this.bidRepository.getOne(qs, query);
    } else {
      return Bid.findOne(qs as FindOneOptions<Bid>);
    }
  }

  async create(
    input: CreateBidInput,
    projectID: number,
    user: User,
  ): Promise<Bid> {
    this.verifyKYC(user);
    const bid = this.createBid(input);
    const { currentInvestor, currentIncubator } = await this.validateUser(user);
    if (currentInvestor) {
      bid.investor = currentInvestor;
    }
    if (currentIncubator) {
      bid.incubator = currentIncubator;
    }
    const selectedProject = await this.validateAndSelectProject(
      projectID,
      user,
    );
    bid.project = selectedProject;
    return this.saveBid(bid);
  }

  createBid(input: CreateBidInput): Bid {
    const bid = new Bid();
    Object.assign(bid, input);
    return bid;
  }

  async validateUser(user: User) {
    const currentInvestor = await this.investorService.findInvestorByUserId(
      user.id,
    );
    const currentIncubator = await this.incubatorService.findIncubatorByUserId(
      user.id,
    );
    if (!currentInvestor && !currentIncubator) {
      throw new Error('You must be an investor or incubator to bid');
    }
    return { currentIncubator, currentInvestor };
  }

  async validateAndSelectProject(projectID: number, user: User) {
    const selectedProject = await this.validateSelectedProject(projectID, user);
    await this.checkProjectAvailability(selectedProject);
    return selectedProject;
  }

  async saveBid(bid: Bid): Promise<Bid> {
    return this.bidRepository.save(bid);
  }

  // async create(
  //   input: CreateBidInput,
  //   projectID: number,
  //   user: User,
  // ): Promise<Bid> {
  //   this.verifyKYC(user);
  //   const bid = new Bid();
  //   Object.assign(bid, input);
  //   const currentInvestor = await this.validateInvestor(user, bid);
  //   const currentIncubator = await this.validateIncubator(user, bid);
  //   if (!currentIncubator || !currentInvestor) {
  //     throw new Error('You must be an investor or incubator to bid');
  //   }
  //   if(currentInvestor){
  //     bid.investor = currentInvestor;
  //   }
  //   if(currentIncubator){
  //     bid.incubator = currentIncubator;
  //   }
  //   const selectedProject = await this.validateSelectedProject(projectID, user);
  //   await this.checkProjectAvailability(selectedProject);
  //   bid.project = selectedProject;
  //   return this.bidRepository.save(bid);
  // }

  createMany(input: CreateBidInput[]): Promise<Bid[]> {
    return this.bidRepository.save(input);
  }

  async update(id: number, input: UpdateBidInput): Promise<Bid> {
    const bid = await this.bidRepository.findOne({ where: { id } });
    if (bid.accepted == true) {
      throw new Error('Bid once accepted cant be updated');
    }
    return this.bidRepository.save({ ...bid, ...input });
  }

  async delete(id: number) {
    const bid = this.bidRepository.findOne({ where: { id } });
    await this.bidRepository.delete({ id });
    return bid;
  }

  async acceptBid(bidID: number): Promise<{ success: boolean }> {
    const bid = await this.bidRepository.findOne({ where: { id: bidID } });
    if (!bid) {
      throw new Error(`Bid with ID ${bidID} not found`);
    }
    if (bid.accepted == true) {
      throw new Error('Bid already accepted');
    }
    bid.accepted = true;
    const savedBid = await bid.save();
    await this.startupInvestmentService.create(
      savedBid,
      bid.project.entrepreneur,
    );

    return { success: true };
  }

  async validateInvestor(user: User, bid: Bid) {
    const currentInvestor = await this.investorService.findInvestorByUserId(
      user.id,
    );
    return currentInvestor || null;
  }

  async validateIncubator(user: User, bid: Bid) {
    const currentIncubator = await this.incubatorService.findIncubatorByUserId(
      user.id,
    );
    return currentIncubator || null;
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

  async checkProjectAvailability(selectedProject: Project) {
    if (
      selectedProject.bid_opening instanceof Date &&
      selectedProject.bid_opening.getTime() >= Date.now()
    ) {
      throw new Error('Project not open for bid yet');
    }
    if (
      selectedProject.bid_closing instanceof Date &&
      selectedProject.bid_closing.getTime() <= Date.now()
    ) {
      throw new Error('Project not open for bid anymore');
    }
  }

  async validateBid(query: string, user: User, id: number) {
    const { currentInvestor, currentIncubator } = await this.validateUser(user);
    let myBids: any;

    if (currentInvestor) {
      myBids = await this.getMany(
        { where: { investor: { id: currentInvestor.id } } },
        query,
      );
    } else if (currentIncubator) {
      myBids = await this.getMany(
        { where: { incubator: { id: currentIncubator.id } } },
        query,
      );
    } else {
      throw new Error('You must be an investor or incubator to bid');
    }

    const selectedBid = await this.getOne({ where: { id: id } }, query);
    if (selectedBid === null) {
      throw new Error('Bid does not exist');
    }

    const bidArray = myBids.data as Bid[];
    if (!bidArray.some((bid) => bid.id === selectedBid.id)) {
      throw new Error('You are not allowed to update this bid');
    }
  }

  private verifyKYC(user: User) {
    if (!user.kyc_verified) {
      throw new Error(
        'You cannot bid on a project if you are not KYC verified',
      );
    }
  }
}
