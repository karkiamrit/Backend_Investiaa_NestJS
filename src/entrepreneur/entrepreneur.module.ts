import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurRepository } from './entrepreneur.repository';
import { EntrepreneurResolver } from './entrepreneur.resolver';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([EntrepreneurRepository, UserRepository])],
  providers: [EntrepreneurService, EntrepreneurResolver, UserService],
  exports: [EntrepreneurService],
})
export class EntrepreneurModule { }
