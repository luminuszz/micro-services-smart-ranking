import { createCategoryDTO } from '../dtos/createCategory.dto'
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto'
import { Category } from '../interfaces/category.interface'
import { Category as MongoCategoryModel } from '../schemas/category.schema'

export interface ICategoryRepository {
  createAndSave(
    createCategory: createCategoryDTO
  ): Promise<Category | MongoCategoryModel>
  findCategoryByName(
    categoryName: string
  ): Promise<Category | MongoCategoryModel>
  getAllCategories(): Promise<Category[] | MongoCategoryModel[]>

  findCategoryById(categoryId: string): Promise<Category | MongoCategoryModel>

  updateCategory(updateCategoryValues: UpdateCategoryDTO): Promise<Category>
}
