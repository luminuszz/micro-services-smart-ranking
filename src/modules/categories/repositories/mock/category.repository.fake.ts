import { createCategoryDTO } from '@modules/categories/dtos/createCategory.dto'
import { ICategoryRepository } from '@modules/categories/repositories/categoryRepository.interface'
import { Category } from '@modules/categories/interfaces/category.interface'
import { v4 } from 'uuid'
import { UpdateCategoryDTO } from '@modules/categories/dtos/updateCategory.dto'
import { AddPlayerCategoryParamsDTO } from '@modules/categories/dtos/addPlayerCategory.dto'

export class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  async verifyPlayerContainInCategory(
    playerId: string,
    categoryName: string
  ): Promise<boolean> {
    const foundedCategory = await this.findCategoryByName(categoryName)

    const isInclude = foundedCategory.players.includes(playerId)

    return isInclude
  }

  async addPlayerToCategory(
    addPlayerToCategory: AddPlayerCategoryParamsDTO
  ): Promise<Category> {
    const { categoryName, playerId } = addPlayerToCategory

    const currentCategoryIndex = this.categories.findIndex(
      category => category.category === categoryName
    )

    this.categories[currentCategoryIndex].players.push(playerId)

    return this.categories[currentCategoryIndex]
  }

  async updateCategory(
    updateCategoryValues: UpdateCategoryDTO
  ): Promise<Category> {
    const { categoryId, description, events } = updateCategoryValues

    const foundCategoryIndex = this.categories.findIndex(
      category => category.id === categoryId
    )

    events.map(event => this.categories[foundCategoryIndex].events.push(event))

    this.categories[foundCategoryIndex].description = description

    return this.categories[foundCategoryIndex]
  }

  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const { category, description, events } = createCategory

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

  async findCategoryById(categoryId: string): Promise<Category | Category> {
    const foundCategory = this.categories.find(
      category => category.id === categoryId
    )

    return foundCategory
  }
}
