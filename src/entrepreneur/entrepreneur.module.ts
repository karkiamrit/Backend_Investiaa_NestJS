import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurRepository } from './entrepreneur.repository';
import { EntrepreneurResolver } from './entrepreneur.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([EntrepreneurRepository]),
    UserModule,
  ],
  providers: [EntrepreneurService, EntrepreneurResolver],

  exports: [EntrepreneurService],
})
export class EntrepreneurModule {}
