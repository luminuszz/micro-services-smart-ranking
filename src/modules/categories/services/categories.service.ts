import { BadRequestException, Injectable } from '@nestjs/common'
import { createCategoryDTO } from '../dtos/createCategory.dto'
import { Category } from '../interfaces/category.interface'
import { notFoundExceptionMessage } from '@shared/resources/exceptions'
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto'
import { AddPlayerCategoryParamsDTO } from '../dtos/addPlayerCategory.dto'
import { ICategoryRepository } from '../repositories/categoryRepository.interface'
import { PlayersService } from '@modules/players/services/players.service'

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly playerService: PlayersService
  ) {}

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

  async addPlayerToCategory(
    addPlayerToCategoryParams: AddPlayerCategoryParamsDTO
  ): Promise<Category> {
    const { categoryName, playerId } = addPlayerToCategoryParams
    const verifyCategoryExists = await this.categoryRepository.findCategoryByName(
      categoryName
    )
    if (!verifyCategoryExists) {
      throw new BadRequestException(`category "${categoryName}" not found`)
    }

    const verifyIfPlayerExists = await this.playerService.getOnePlayerById(
      playerId
    )

    console.log(verifyIfPlayerExists)

    if (!verifyIfPlayerExists) {
      throw new BadRequestException(`player not found`)
    }

    const verifyUserIncludesInCategory = await this.categoryRepository.verifyPlayerContainInCategory(
      playerId,
      categoryName
    )

    if (verifyUserIncludesInCategory) {
      throw new BadRequestException(
        'This player already registered in this category'
      )
    }

    const category = await this.categoryRepository.addPlayerToCategory(
      addPlayerToCategoryParams
    )

    return category
  }
}
