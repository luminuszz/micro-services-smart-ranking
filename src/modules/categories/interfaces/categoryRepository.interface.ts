import { createCategoryDTO } from '../dtos/createCategory.dto'
import { Category } from '../schemas/category.schema'

export interface ICategoryRepository {
  createAndSave(createCategory: createCategoryDTO): Promise<Category>
  findCategoryByName(categoryName: string): Promise<Category | undefined>
  getAllCategories(): Promise<Category[]>
}
