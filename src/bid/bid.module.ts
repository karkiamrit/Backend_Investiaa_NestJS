import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { BidService } from './bid.service';
import { BidRepository } from './bid.repository';
import { BidResolver } from './bid.resolver';
import { ProjectModule } from '../project/project.module';
import { InvestorModule } from '../investor/investor.module';
import { UserModule } from '../user/user.module';
import { StartupInvestmentModule } from '../startup_investment/startup_investment.module';

import { EntrepreneurModule } from 'src/entrepreneur/entrepreneur.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BidRepository]),
    UserModule,
    ProjectModule,
    InvestorModule,
    StartupInvestmentModule,
    EntrepreneurModule,
  ],
  providers: [BidService, BidResolver],
  exports: [BidService],
})
export class BidModule {}
