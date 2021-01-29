import { EntityRepository, MongoRepository } from 'typeorm'
import { createCategoryDTO } from '../dtos/createCategory.dto'
import { ICategoryRepository } from '../interfaces/categoryRepository.interface'
import { Category } from '../schemas/category.schema'

@EntityRepository(Category)
export class CategoryRepository
  extends MongoRepository<Category>
  implements ICategoryRepository {
  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const newCategory = this.create(createCategory)

    await this.save(newCategory)

    return newCategory
  }

  async findCategoryByName(
    categoryName: string
  ): Promise<Category | undefined> {
    const foundedCategory = await this.findOne({ category: categoryName })

    return foundedCategory
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.find()

    return categories
  }
}
