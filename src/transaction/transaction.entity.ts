import { CreateDateColumn ,JoinTable,Column, Entity, PrimaryGeneratedColumn, ManyToOne ,ManyToMany} from "typeorm";
import { BankModel } from "src/bank/bank.entity";
import { CategoryModel } from "src/category/category.entity";


@Entity()
export class TransactionModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;


    @Column()
    type: string;

    @ManyToOne(() => BankModel, (bank: BankModel) => bank.trans)
    bank: BankModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    // @ManyToOne(() => CategoryModel, (category: CategoryModel) => category.trans)
    // category: CategoryModel;
    

    @ManyToMany(() => CategoryModel, (category) => category.trans)
    @JoinTable()
    categories: CategoryModel[]
}