import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { Startup_investmentService } from './startup_investment.service';
import { Startup_investmentRepository } from './startup_investment.repository';
import { Startup_investmentResolver } from './startup_investment.resolver';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([Startup_investmentRepository]),
  ],
  providers: [Startup_investmentService, Startup_investmentResolver],
  exports: [Startup_investmentService],
})
export class Startup_investmentModule {}
