import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';


@Module({
  imports: [TypeOrmExModule.forCustomRepository([TokenRepository])],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
