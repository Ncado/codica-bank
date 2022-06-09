import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionModel } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { JwtModule } from '@nestjs/jwt';
import { BankModule } from 'src/bank/bank.module';
import { CategoryModule } from 'src/category/category.module';
@Module({
  imports: [
   
    TypeOrmModule.forFeature([TransactionModel]),
    
    JwtModule.register({secret:"NOT_SECRET",
  signOptions:{
    expiresIn: "2000h"
  }}), 
  BankModule,
  CategoryModule
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports:[TransactionService]
})
export class TransactionModule {}
