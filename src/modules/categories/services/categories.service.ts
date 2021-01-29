import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { createCategoryDTO } from '../dtos/createCategory.dto'

import { CategoryRepository } from '../repositories/category.repository'
import { Category } from '../schemas/category.schema'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  private logger = new Logger()

  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const { category } = createCategory

    this.logger.debug(createCategory)

    const checkCategoryExists = await this.categoryRepository.findCategoryByName(
      category
    )

    if (checkCategoryExists) {
      const { category: categoryName } = checkCategoryExists
      throw new BadRequestException(`Category ${categoryName} already exists`)
    }

    const newCategory = await this.categoryRepository.createAndSave(
      createCategory
    )

    return newCategory
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.getAllCategories()

    return categories
  }
}
