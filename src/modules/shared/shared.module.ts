import { Module } from '@nestjs/common';
import { SettingService } from './services/setting.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [SettingService],
  exports: [SettingService],
})
export class SharedModule {}
