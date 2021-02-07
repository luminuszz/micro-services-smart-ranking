import { BadRequestException, Injectable } from '@nestjs/common'
import { createCategoryDTO } from '../dtos/createCategory.dto'

import { CategoryRepository } from '../repositories/category.repository'
import { Category } from '../interfaces/category.interface'
import { notFoundExceptionMessage } from '@shared/resources/exceptions'
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const { category } = createCategory

    const checkCategoryExists = await this.categoryRepository.findCategoryByName(
      category
    )

    if (checkCategoryExists) {
      const { category: categoryName } = checkCategoryExists
      throw new BadRequestException(`${categoryName} already exists`)
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

  async getOneCategoryById(categoryId: string): Promise<Category | undefined> {
    const foundedCategory = await this.categoryRepository.findCategoryById(
      categoryId
    )

    if (!foundedCategory) {
      throw new BadRequestException(notFoundExceptionMessage('Category'))
    }

    return foundedCategory
  }

  async getOneCategoryByName(
    categoryName: string
  ): Promise<Category | undefined> {
    const foundedCategory = await this.categoryRepository.findCategoryByName(
      categoryName
    )

    if (!foundedCategory) {
      throw new BadRequestException(notFoundExceptionMessage('Category'))
    }

    return foundedCategory
  }

  async updateCategory(
    updateCategoryValues: UpdateCategoryDTO
  ): Promise<Category> {
    const checkCategoryExists = await this.categoryRepository.findCategoryById(
      updateCategoryValues.categoryId
    )

    if (!checkCategoryExists) {
      throw new BadRequestException(notFoundExceptionMessage('Category'))
    }

    const updatedCategory = await this.categoryRepository.updateCategory(
      updateCategoryValues
    )

    return updatedCategory
  }
}
