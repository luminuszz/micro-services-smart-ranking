import { createCategoryDTO } from '@modules/categories/dtos/createCategory.dto'
import { ICategoryRepository } from '@modules/categories/interfaces/categoryRepository.interface'
import { Category } from '@modules/categories/schemas/category.schema'
import { v4 } from 'uuid'

export class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const newCategory: Category = {
      ...createCategory,
      _id: v4(),
      createdAt: new Date(),
      updateAt: new Date(),
      players: [],
    }

    this.categories.push(newCategory)

    return newCategory
  }

  async findCategoryByName(
    categoryName: string
  ): Promise<Category | undefined> {
    const foundedCategory = this.categories.find(
      currentCategory => currentCategory.category === categoryName
    )

    return foundedCategory
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categories
  }
}
