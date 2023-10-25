import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { Project_detailsService } from './project_details.service';
import { Project_detailsRepository } from './project_details.repository';
import { Project_detailsResolver } from './project_details.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([Project_detailsRepository])],
  providers: [Project_detailsService, Project_detailsResolver],
  exports: [Project_detailsService],
})
export class Project_detailsModule {}
