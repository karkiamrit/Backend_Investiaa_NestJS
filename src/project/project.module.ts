import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { EntrepreneurRepository } from 'src/entrepreneur/entrepreneur.repository';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { EntrepreneurService } from 'src/entrepreneur/entrepreneur.service';
// import { FileService } from '../util/file';
``;
@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProjectRepository])],
  providers: [
    ProjectService,
    ProjectResolver,
    EntrepreneurService,
    EntrepreneurRepository,
    UserService,
    UserRepository,
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
