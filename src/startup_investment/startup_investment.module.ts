import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { StartupInvestmentService } from './startup_investment.service';
import { StartupInvestmentRepository } from './startup_investment.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([StartupInvestmentRepository])],
  providers: [StartupInvestmentService],
  exports: [StartupInvestmentService],
})
export class StartupInvestmentModule {}
