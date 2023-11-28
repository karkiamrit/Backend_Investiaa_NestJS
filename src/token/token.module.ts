import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../modules/decorators/typeorm.module';
import { TokenService } from './token.service';
import { RedisModule } from 'src/modules/redis/redis.module';
// import { TokenRepository } from './token.repository';

@Module({
  imports:[RedisModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
