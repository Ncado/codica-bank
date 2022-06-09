import { Body, Controller, Get, Patch, Post, Put,Param, Delete } from '@nestjs/common';
import {BankModel} from './bank.entity'
import {BankDTO} from './DTO/bank.dto';
import { BankService } from './bank.service';
import {ApiOperation, ApiResponse, ApiTags,ApiBody} from "@nestjs/swagger";

@Controller('bank')
export class BankController {

    constructor(private userService: BankService) {}

   
    @ApiOperation({summary: 'create bank'})
    @ApiResponse({status: 200})
    @Post()
    create(@Body() bank: BankDTO) {
        return this.userService.create(bank);
    }


    @ApiOperation({summary: 'get all banks'})
    @ApiResponse({status: 200})
    @Get()
    getAll() {
        return this.userService.getAll();
    }


    @ApiOperation({summary: 'get one bank'})
    @ApiResponse({status: 200})
    @Get(":id")
    getOne(@Param('id') id: number) {
        return this.userService.getOne(id);
    }

    @ApiOperation({summary: 'update bank data'})
    @ApiResponse({status: 200})
    @Put()
    update(@Body() bank: BankDTO) {
        return this.userService.update(bank);
    }
    

    @ApiOperation({summary: 'delete bank'})
    @ApiResponse({status: 200})
    @Delete(":id")
    delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }


    @ApiOperation({summary: 'change balanse '})
    @ApiResponse({status: 200})
    @Patch(":id/:amount")
    test(@Param('id') id: number, @Param('amount') amount: number){
        return this.userService.changeBalanse(id,amount)
    }
}
