import { Controller,Put,Body,Get,Patch,Param, Delete, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './DTO/category.dto';
import {ApiOperation, ApiResponse, ApiTags,ApiBody} from "@nestjs/swagger";


@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @ApiOperation({summary: 'create category'})
    @ApiResponse({status: 200})
    @Post()
    create(@Body() category: CategoryDTO) {
        return this.categoryService.create(category);
    }


    @ApiOperation({summary: 'get all category'})
    @ApiResponse({status: 200})
    @Get()
    getAll() {
        return this.categoryService.getAll();
    }


    @ApiOperation({summary: 'get one category'})
    @ApiResponse({status: 200})
    @Get(":id")
    getOne(@Param('id') id: number) {
        return this.categoryService.getOne(id);
    }

    @ApiOperation({summary: 'update category data'})
    @ApiResponse({status: 200})
    @Put()
    update(@Body() category: CategoryDTO) {
        return this.categoryService.update(category);
    }


    @ApiOperation({summary: 'delete category'})
    @ApiResponse({status: 200})
    @Delete(":id")
    deleteCategory(@Param('id') id: number) {
        return this.categoryService.deleteCategory(id);
    }


}
