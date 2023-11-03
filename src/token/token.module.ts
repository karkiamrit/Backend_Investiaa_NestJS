import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { TokenService } from './token.service';
// import { TokenRepository } from './token.repository';

@Module({
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
