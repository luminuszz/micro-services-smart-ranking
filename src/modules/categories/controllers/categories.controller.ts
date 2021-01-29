import { Controller, Get, Post } from '@nestjs/common'
import { createCategoryDTO } from '../dtos/createCategory.dto'
import { Category } from '../schemas/category.schema'
import { CategoriesService } from '../services/categories.service'

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(createCategory: createCategoryDTO): Promise<Category> {
    const newCategory = await this.categoriesService.createAndSave(
      createCategory
    )

    return newCategory
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoriesService.getAllCategories()

    return categories
  }
}
