import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { StartupContractService } from './startup_contract.service';
import { StartupContractRepository } from './startup_contract.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([StartupContractRepository])],
  providers: [StartupContractService],
  exports: [StartupContractService],
})
export class StartupContractModule {}
