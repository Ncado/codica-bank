import { Body, Controller, Get, Patch, Post, Put ,Param,Query, Delete} from '@nestjs/common';
import { TransactionModel } from './transaction.entity';
import { TransactionDTO } from './DTO/transaction.dto';
import { TransactionService } from './transaction.service';
import { JwtService } from '@nestjs/jwt';
import {ApiOperation, ApiResponse, ApiTags,ApiBody} from "@nestjs/swagger";


@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService,
         private jwtService: JwtService
        ) {}


    @ApiOperation({summary: 'create transaction'})
    @ApiResponse({status: 200})    
    @Post(":unicIdentifer")
    async create(@Body() transaction: TransactionDTO,@Param('unicIdentifer') unic:string, @Query('apiKey') apiKey: string) {

        if(await this.jwtService.verify(apiKey).id ==unic){
            const emailcheck = /\S+@\S+\.\S+/;
            if(emailcheck.test(await this.jwtService.verify(apiKey).email)){
                transaction.email = await this.jwtService.verify(apiKey).email;
                return this.transactionService.create(transaction);
            }
        }
        return false;
    }


    @ApiOperation({summary: 'get all transaction'})
    @ApiResponse({status: 200})
    @Get()
    getAll(@Query('take') take :number, @Query('skip') skip : number) {
        return this.transactionService.getAll(take,skip);
    }

    @ApiOperation({summary: 'get one transaction'})
    @ApiResponse({status: 200})
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.transactionService.getOne(id);
    }


    @ApiOperation({summary: 'create transaction'})
    @ApiResponse({status: 200}) 
  @Post()
  generateHook(@Query('email') email: string) {
    
    return this.transactionService.generateHook(email);
  }

 @ApiOperation({summary: 'delete transaction'})
    @ApiResponse({status: 200})
  @Delete(':id')
  deleteTransaction(@Param('id') id: number){
        return this.transactionService.deleteTransaction(id);
  }
}
