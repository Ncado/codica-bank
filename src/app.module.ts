import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './bank/bank.module';
import { CategoryModule } from './category/category.module';

import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { StatisticsModule } from './statistics/statistics.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    BankModule, 
    CategoryModule,
    TransactionModule,
    StatisticsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[
    
    AppService
  ]
})
export class AppModule {}
