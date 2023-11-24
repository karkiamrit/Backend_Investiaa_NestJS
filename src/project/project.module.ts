import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { EntrepreneurModule } from 'src/entrepreneur/entrepreneur.module';
import { UserModule } from 'src/user/user.module';

// import { YearScalar } from 'src/modules/types/scalars/year.scalar';

// import { FileService } from '../util/file';
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ProjectRepository]),
    EntrepreneurModule,
    UserModule,
  ],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
