import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { BidService } from './bid.service';
import { BidRepository } from './bid.repository';
import { BidResolver } from './bid.resolver';
import { ProjectModule } from '../project/project.module';
import { InvestorModule } from '../investor/investor.module';
import { UserModule } from '../user/user.module';
import { StartupContractModule } from '../startup_contract/startup_contract.module';

import { EntrepreneurModule } from 'src/entrepreneur/entrepreneur.module';
import { IncubatorModule } from 'src/incubator/incubator.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BidRepository]),
    UserModule,
    ProjectModule,
    InvestorModule,
    IncubatorModule,
    StartupContractModule,
    EntrepreneurModule,
  ],
  providers: [BidService, BidResolver],
  exports: [BidService],
})
export class BidModule {}
