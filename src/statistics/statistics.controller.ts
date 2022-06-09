import { Controller, Get, Post,Body } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { StatisticGetDTO } from './DTO/staticticGet.dto';


@Controller('statistics')
export class StatisticsController {
    constructor(
    
        private transactionService: TransactionService,
        private categoryService: CategoryService
    ) { }
    @Post("")
    async getStatisctic(@Body() transaction: StatisticGetDTO){
         const byDate = await this.transactionService.getStatistic(transaction);
         const byId = await this.categoryService.getStatistic(transaction);
        console.log(JSON.stringify(byId))
        console.log("bt DAAAAAATE ->"+JSON.stringify(byDate))
         var result = byDate.filter((v)=> {
            return byId.some((v2)=> {
                return v.id == v2.id;
            })
        
        })
        return result
    
         //  return await this.transactionService.getStatistic(transaction);
    }
    

}
