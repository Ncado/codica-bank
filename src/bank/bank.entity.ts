import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { TransactionModel } from "src/transaction/transaction.entity";


@Entity()
export class BankModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    balance: number;

    @OneToMany(() => TransactionModel, (trans: TransactionModel) => trans.bank)
    trans: TransactionModel[];

}