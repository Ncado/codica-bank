import { Module } from '@nestjs/common';
import { TransactionModule } from 'src/transaction/transaction.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { CategoryModule } from 'src/category/category.module';
@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports:[TransactionModule,CategoryModule]
})
export class StatisticsModule {}
