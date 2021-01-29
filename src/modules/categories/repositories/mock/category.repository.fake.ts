import { createCategoryDTO } from '@modules/categories/dtos/createCategory.dto'
import { ICategoryRepository } from '@modules/categories/interfaces/categoryRepository.interface'
import { Category } from '@modules/categories/interfaces/category.interface'
import { v4 } from 'uuid'

export class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const { category, description, events, players } = createCategory

    const newCategory = {
      _id: v4(),
      category,
      description,
      events: events.map(event => ({ ...event, _id: v4() })),
      players: [],
      createdAt: new Date(),
      updateAt: new Date(),
    } as Category

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
