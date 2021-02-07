import { createCategoryDTO } from '../../dtos/createCategory.dto'
import { ICategoryRepository } from '../categoryRepository.interface'
import { CategoryDocument } from '../../schemas/category.schema'
import { Category } from '../../interfaces/category.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { UpdateCategoryDTO } from '../../dtos/updateCategory.dto'
import { AddPlayerCategoryParamsDTO } from '../../dtos/addPlayerCategory.dto'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>
  ) {}

  addPlayerToCategory(
    addPlayerToCategory: AddPlayerCategoryParamsDTO
  ): Promise<Category> {
    throw new Error('Method not implemented.')
  }

  async updateCategory(
    updateCategoryValues: UpdateCategoryDTO
  ): Promise<Category> {
    const { categoryId, ...fields } = updateCategoryValues

    console.log('updateCategoryValues', updateCategoryValues)

    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(categoryId, { $set: { ...fields } })
      .exec()

    return updatedCategory
  }

  async createAndSave(createCategory: createCategoryDTO): Promise<Category> {
    const newCategory = await this.categoryModel.create(createCategory)

    return newCategory
  }

  async findCategoryByName(
    categoryName: string
  ): Promise<Category | undefined> {
    const foundedCategory = await this.categoryModel
      .findOne({
        category: categoryName,
      })
      .exec()

    return foundedCategory
  }

  async findCategoryById(categoryId: string): Promise<Category | Category> {
    const foundCategory = await this.categoryModel
      .findOne({ _id: categoryId })
      .exec()
    return foundCategory
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find().exec()

    return categories
  }
}
