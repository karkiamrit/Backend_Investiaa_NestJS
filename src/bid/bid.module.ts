import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { BidService } from './bid.service';
import { BidRepository } from './bid.repository';
import { BidResolver } from './bid.resolver';
import { InvestorService } from '../investor/investor.service';
import { InvestorRepository } from '../investor/investor.repository';
import { ProjectService } from '../project/project.service';
import { ProjectRepository } from '../project/project.repository';
import { EntrepreneurRepository } from '../entrepreneur/entrepreneur.repository';
import { EntrepreneurService } from '../entrepreneur/entrepreneur.service';
import { ProjectModule } from 'src/project/project.module';
import { InvestorModule } from 'src/investor/investor.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BidRepository]),
    ProjectModule,
    InvestorModule
  ],
  providers: [
    BidService,
    BidResolver,
    InvestorService,
    InvestorRepository,
    ProjectRepository,
    ProjectService,
    EntrepreneurService,
    EntrepreneurRepository,
  ],
  exports: [BidService],
})
export class BidModule {}
