import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ParseStringPipePipe } from '@shared/pipes/parse-string-pipe.pipe'
import { AddPlayerCategoryParamsDTO } from '../dtos/addPlayerCategory.dto'
import { createCategoryDTO } from '../dtos/createCategory.dto'
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto'
import { Category } from '../interfaces/category.interface'
import { CheckEventsNameIsUniquesPipe } from '../pipes/checkEventsNameIsUniquesPipe.pipe'
import { CategoriesService } from '../services/categories.service'

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body()
    data: createCategoryDTO
  ): Promise<Category> {
    const newCategory = await this.categoriesService.createAndSave(data)

    return newCategory
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoriesService.getAllCategories()

    return categories
  }

  @Get(':categoryId')
  async getCategoryById(
    @Param('categoryId', ParseStringPipePipe)
    categoryId: string
  ): Promise<Category> {
    const category = await this.categoriesService.getOneCategoryById(categoryId)

    return category
  }

  @Get(':categoryId')
  async getCategoryByName(
    @Param('categoryId', ParseStringPipePipe)
    categoryId: string
  ): Promise<Category> {
    const category = await this.categoriesService.getOneCategoryByName(
      categoryId
    )

    return category
  }

  @Put()
  async updateCategory(
    @Body(CheckEventsNameIsUniquesPipe) updateCategoryValues: UpdateCategoryDTO
  ): Promise<Category> {
    const updatedCategory = await this.categoriesService.updateCategory(
      updateCategoryValues
    )

    return updatedCategory
  }

  @Post('/:categoryName/players/:playerId')
  async addPlayerToCategory(
    @Param() addCategoryParams: AddPlayerCategoryParamsDTO
  ): Promise<any> {
    const { categoryName, playerId } = addCategoryParams
  }
}
