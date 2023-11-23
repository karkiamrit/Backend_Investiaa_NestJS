import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { IncubatorService } from './incubator.service';
import { IncubatorRepository } from './incubator.repository';
import { IncubatorResolver } from './incubator.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([IncubatorRepository])],
  providers: [IncubatorService, IncubatorResolver],
  exports: [IncubatorService],
})
export class IncubatorModule {}
