import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurRepository } from './entrepreneur.repository';
import { EntrepreneurResolver } from './entrepreneur.resolver';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      EntrepreneurRepository,
      UserRepository,
    ]),
  ],
  providers: [EntrepreneurService, UserService, EntrepreneurResolver],

  exports: [EntrepreneurService],
})
export class EntrepreneurModule {}
