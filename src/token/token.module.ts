import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TokenRepository])],
  providers: [TokenService, TokenRepository, UserRepository],
  exports: [TokenService],
})
export class TokenModule {}
