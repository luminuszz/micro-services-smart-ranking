import { createCategoryDTO } from '../dtos/createCategory.dto'
import { ICategoryRepository } from '../interfaces/categoryRepository.interface'
import { CategoryDocument, Category } from '../schemas/category.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>
  ) {}

  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const newCategory = await this.categoryModel.create(createCategory)

    return newCategory
  }

  async findCategoryByName(
    categoryName: string
  ): Promise<Category | undefined> {
    const foundedCategory = await this.categoryModel.findOne({
      category: categoryName,
    })

    return foundedCategory
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find()

    return categories
  }
}
