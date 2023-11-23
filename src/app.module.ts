import { IncubatorModule } from './incubator/incubator.module';
import { StartupInvestmentModule } from './startup_investment/startup_investment.module';
import { BidModule } from './bid/bid.module';
import { InvestorModule } from './investor/investor.module';
import { ProjectModule } from './project/project.module';
import { EntrepreneurModule } from './entrepreneur/entrepreneur.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DeclareModule } from './declare/declare.module';
import { getEnvPath } from './modules/helper/env.helper';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from './modules/shared/shared.module';
import { SettingService } from './modules/shared/services/setting.service';
import { HealthModule } from './health/health.module';
// import { PlaceModule } from './place/place.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(`${__dirname}/..`),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [SharedModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) =>
        settingService.graphqlUseFactory,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) =>
        settingService.typeOrmUseFactory,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    DeclareModule,
    CronModule,
    HealthModule,
    OtpModule,
    MailModule,
    EntrepreneurModule,
    InvestorModule,
    ProjectModule,
    IncubatorModule,
    BidModule,
    StartupInvestmentModule,
    TokenModule,
  ],
})
export class AppModule {}
