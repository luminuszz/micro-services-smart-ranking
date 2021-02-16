import { AddPlayerCategoryParamsDTO } from '../dtos/addPlayerCategory.dto'
import { createCategoryDTO } from '../dtos/createCategory.dto'
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto'
import { Category } from '../interfaces/category.interface'

export abstract class ICategoryRepository {
  abstract createAndSave(createCategory: createCategoryDTO): Promise<Category>

  abstract findCategoryByName(categoryName: string): Promise<Category>

  abstract getAllCategories(): Promise<Category[]>

  abstract findCategoryById(categoryId: string): Promise<Category>

  abstract updateCategory(
    updateCategoryValues: UpdateCategoryDTO
  ): Promise<Category>

  abstract addPlayerToCategory(
    addPlayerToCategory: AddPlayerCategoryParamsDTO
  ): Promise<Category>

  abstract verifyPlayerContainInCategory(
    playerId: string,
    categoryName: string
  ): Promise<boolean>
}
