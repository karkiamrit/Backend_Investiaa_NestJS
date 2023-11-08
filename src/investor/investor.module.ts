import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { InvestorService } from './investor.service';
import { InvestorRepository } from './investor.repository';
import { InvestorResolver } from './investor.resolver';


@Module({
  imports: [TypeOrmExModule.forCustomRepository([InvestorRepository])],
  providers: [InvestorService, InvestorResolver],
  exports: [InvestorService],
})
export class InvestorModule {}
