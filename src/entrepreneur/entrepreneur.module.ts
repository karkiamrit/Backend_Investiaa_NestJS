import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurRepository } from './entrepreneur.repository';
import { EntrepreneurResolver } from './entrepreneur.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([EntrepreneurRepository])],
  providers: [EntrepreneurService, EntrepreneurResolver],
  exports: [EntrepreneurService],
})
export class EntrepreneurModule {}
