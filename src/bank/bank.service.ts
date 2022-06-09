import { Injectable } from '@nestjs/common';
import {BankDTO} from './DTO/bank.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BankModel } from './bank.entity';

import { TransactionDTO } from 'src/transaction/DTO/transaction.dto';


@Injectable()
export class BankService {
    constructor(
        @InjectRepository(BankModel)
        private bankRepository: Repository<BankModel>
    ) {}
    
    async create(bank: BankDTO) {
        return await this.bankRepository.save(bank);
    }


    async getOne(id:number) {
        return await this.bankRepository.findOne({ where: [{ "id": id }],relations: [ "trans"] });
    }
    
    async getAll() {
        return await this.bankRepository.find({relations: [ "trans"]});
    }

    async update(bank: BankDTO) {
        const elem = await this.bankRepository.findOne({ where: [{ "id": bank.id }] });

        if (bank.name) {
            elem.name = bank.name;
        }
        if (bank.balance) {
            elem.balance = bank.balance;
        }
        return await this.bankRepository.save(elem)
    }

    async delete(id:number){
        const bank = await this.bankRepository.findOne({ where: [{ "id": id }],relations: [ "trans"] });
        if(bank?.trans.length==0){
            
            
            return await this.bankRepository.delete(bank.id) ;
        }else{
            return "exist transaction, delete them  before you destroy bank"
        }  

    }
    async changeBalanse(id:number, amount:number){
        const elem = await this.bankRepository.findOne({ where: [{ "id": id }] });

        elem.balance = Number(elem.balance) + Number(amount);
       
        return  await this.bankRepository.save(elem);
    }
}

