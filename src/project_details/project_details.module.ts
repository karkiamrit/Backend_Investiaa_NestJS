import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { Project_detailsService } from './project_details.service';
import { Project_detailsRepository } from './project_details.repository';
import { Project_detailsResolver } from './project_details.resolver';
import { EntrepreneurRepository } from 'src/entrepreneur/entrepreneur.repository';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
// import { FileService } from '../util/file';
``;
@Module({
  imports: [TypeOrmExModule.forCustomRepository([Project_detailsRepository])],
  providers: [
    Project_detailsService,
    Project_detailsResolver,
    EntrepreneurRepository,
    UserService,
    UserRepository,
  ],
  exports: [Project_detailsService],
})
export class Project_detailsModule {}
