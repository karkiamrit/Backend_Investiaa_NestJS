import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { EntrepreneurRepository } from '../entrepreneur/entrepreneur.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { EntrepreneurService } from '../entrepreneur/entrepreneur.service';

// import { YearScalar } from 'src/modules/types/scalars/year.scalar';

// import { FileService } from '../util/file';
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
