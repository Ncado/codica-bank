import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { TransactionModel } from "src/transaction/transaction.entity";
@Entity()
export class CategoryModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    type: string;

    @ManyToMany(() => TransactionModel, (transaction) => transaction.categories,)
    trans: TransactionModel[]

}