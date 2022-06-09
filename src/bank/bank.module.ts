import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModel } from './bank.entity';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([BankModel])
  ],
  providers: [BankService],
  controllers: [BankController],
  exports :[BankService]
})
export class BankModule {}
