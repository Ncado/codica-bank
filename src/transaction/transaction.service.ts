import { Injectable, HttpException ,HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDTO } from './DTO/transaction.dto';
import { Repository,Between, In } from 'typeorm';
import { TransactionModel } from './transaction.entity';
const shortid = require('shortid')
import { JwtService } from '@nestjs/jwt';
import { BankService } from 'src/bank/bank.service';
import { CategoryService } from 'src/category/category.service';
import { StatisticGetDTO } from 'src/statistics/DTO/staticticGet.dto';
@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(TransactionModel)
        private transactioRepository: Repository<TransactionModel>,
        private jwtService: JwtService,
        private bankService:BankService,
        private categoryService:CategoryService
    ) { }


    async checkCategorysValidity(transaction: TransactionDTO) {
        let categoryObjectsmass = []
        for (let i = 0; i < transaction.categories.length; i++) {
            let category = await this.categoryService.getOne(transaction.categories[i])
            categoryObjectsmass.push(category)
            if(i!=0){
                // console.log("dsdsdsd     ->"+JSON.stringify(categoryObjectsmass[i]))
                if(categoryObjectsmass[i].type==categoryObjectsmass[i-1].type){
                    // console.log("is i ->"+categoryObjectsmass[i].type+"     is i ->"+categoryObjectsmass[i-1].type);
                }
                else{
                    throw new HttpException({
                        status: HttpStatus.FORBIDDEN,
                        error: 'category must be one type',
                      }, HttpStatus.FORBIDDEN);
                }
            }
        }
        // console.log("return checkCategorysValidity -> "+categoryObjectsmass[0].type)
        return categoryObjectsmass
  }



   async getStatistic(statictic:StatisticGetDTO){

    let categorymass = []
    for (let i = 0; i < statictic.idCategory.length; i++) {
        let category = await this.categoryService.getOne(Number(statictic.idCategory[i]))
        delete category.trans
        
        categorymass.push(JSON.stringify(category) )
        // console.log(1111111111111111111)
        // console.log(JSON.stringify(category))
        // console.log(2222222222222222222222)
    }
    console.log(33333333333)
 
    const usersBetweenTimes = await this.transactioRepository.find({
       // relations: [ "categories"],
        where: {
           
            "createdAt": Between(
                //(year, monthIndex, day, hours, minutes)
               // new Date(2022,0,0,0,50), 
               /// new Date(2022,12,12,1,50), 
                    
              // "2022-01-01T19:00:00.097Z", 
               //"2022-06-10T19:02:00.097Z", 

               statictic.fromPeriod,
               statictic.toPeriod
            ),
        }
    })
  
//     console.log("statictic.fromPeriod-> "+ statictic.fromPeriod+ "formaed-> "+Date.parse(statictic.fromPeriod))
//     console.log("statictic.toPeriod-> "+ statictic.toPeriod+ "formaed-> "+Date.parse(statictic.toPeriod))
//    console.log(statictic.idCategory)
//    console.log(usersCategory)

    return usersBetweenTimes
   }



    async create(transaction: TransactionDTO) {

        // console.log(transaction.categories);
         let mass = await this.checkCategorysValidity(transaction)
        // console.log("categoryyy"+transaction.categories);
        // let categoryObj = [];
        // for (const key in transaction.categories) {
        //     categoryObj.push(await this.categoryService.getOne(key))
            
        // }


        // for (let i = 0; i < transaction.categories.length; i++) {
        //     let category = await this.categoryService.getOne(transaction.categories[i])
        //     categoryObj.push(category)
        //     if(i!=0){
        //         console.log("dsdsdsd     ->"+JSON.stringify(categoryObj[i]))
        //         if(categoryObj[i].type==categoryObj[i-1].type){
        //              console.log("is i ->"+categoryObj[i].type+"     is i ->"+categoryObj[i-1].type);
        //         }
        //         else{
        //             throw new HttpException({
        //                 status: HttpStatus.FORBIDDEN,
        //                 error: 'category must be one type',
        //               }, HttpStatus.FORBIDDEN);
        //         }
        //     }
        //}
        
        // console.log(JSON.stringify(categoryObj))
         
        
        // this.categoryService.getOne
        let type = mass[0].type
      
        transaction.categories = mass;
        
        transaction.type = type
        const trans = await this.transactioRepository.save(transaction);
        if(type=="consumable"){
            trans.amount= -Math.abs(trans.amount)
        }
        if(type=="profitable"){
            trans.amount=  Math.abs(trans.amount)
        }
        await this.bankService.changeBalanse(trans.bank, trans.amount);
        return trans;
    }



    async getAll(take :number, skip : number) {
        
        const all =  await this.transactioRepository.findAndCount(
            {
                take: take,
                skip: skip,
                relations: [ "categories"]
            }
        );
        // console.log(JSON.stringify(all))
        return await all
        return await this.transactioRepository.find();
    }
    async getOne(id:number) {
        return await this.transactioRepository.findOne({where:[{"id": id}]});
    }
    async generateHook(email:string) {
        const unicIdentifer = shortid.generate();
        const payload = {email: email, id: unicIdentifer}
        const token =  await this.jwtService.sign(payload);
        return process.env.HOST+":"+"8080"+"/"+"transaction"+"/"+unicIdentifer+"/?apiKey="+token;
      }
    async deleteTransaction(id:number){
        return await this.transactioRepository.delete(id)
    }
}
