import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryDTO } from './DTO/category.dto';
import { Repository, Between, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryModel } from './category.entity';
import { StatisticGetDTO } from 'src/statistics/DTO/staticticGet.dto';
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryModel)
        private categoryRepository: Repository<CategoryModel>
    ) { }

    async getStatistic(statictic: StatisticGetDTO) {
        const users = await this.categoryRepository.find({
            where: {
                "id": In(statictic.idCategory),

            },
            relations: ["trans"]
        })

        let res = []

        for (let i = 0; i < users.length; i++) {

            res.push(...users[i].trans)
        }
        return res
    }



    async create(category: CategoryDTO) {

        if (category.type == "consumable" || category.type == "profitable") {
            return await this.categoryRepository.save(category);
        }
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'category must have consumable or profitable type',
        }, HttpStatus.FORBIDDEN);

    }
    async getOne(id) {
        return await this.categoryRepository.findOne({ where: [{ "id": id }], relations: ["trans"] });
    }

    async getAll() {

        const categories = await this.categoryRepository.find({ relations: ["trans"] });
   
        return categories
    }

    async update(category: CategoryDTO) {
        const elem = await this.categoryRepository.findOne({ where: [{ "id": category.id }] });

        if (category.name) {
            elem.name = category.name;
        }
        if (category.type == "consumable" || category.type == "profitable") {
            elem.type = category.type;
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'category must have consumable or profitable type',
            }, HttpStatus.FORBIDDEN);
        }
        return await this.categoryRepository.save(elem)

    }

    async deleteCategory(id: number) {
        const category = await this.categoryRepository.findOne({ where: [{ "id": id }], relations: ["trans"] });
        if (category?.trans.length) {
            return await this.categoryRepository.delete(category.id);
        }

    }
}
