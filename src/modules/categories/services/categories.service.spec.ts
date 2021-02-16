import { Test, TestingModule } from '@nestjs/testing'
import { CategoryRepository } from '../repositories'
import { CategoriesService } from './categories.service'
import { TestUtils } from '@shared/utils/testUtils'
import { BadRequestException } from '@nestjs/common'
import { PlayersService } from '@modules/players/services/players.service'
import { PlayerRepository } from '@modules/players/repositories'

describe('CategoriesService', () => {
  let service: CategoriesService
  let playerService: PlayersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        CategoryRepository,
        PlayersService,
        PlayerRepository,
      ],
    }).compile()

    service = module.get<CategoriesService>(CategoriesService)
    playerService = module.get<PlayersService>(PlayersService)
  })

  describe('createAndSave', () => {
    it('should be able to create a new category', async () => {
      const newCategory = TestUtils.getValidCategoryDTO()

      const category = await service.createAndSave(newCategory)

      expect(category).toHaveProperty('_id')
    })

    it('should not be able to crate a new category with same exits', async () => {
      const newCategory = TestUtils.getValidCategoryDTO()

      const { category: categoryOneName } = await service.createAndSave(
        newCategory
      )

      const newCategory2 = TestUtils.getValidCategoryDTO()

      newCategory2.category = categoryOneName

      await expect(service.createAndSave(newCategory2)).rejects.toBeInstanceOf(
        BadRequestException
      )
    })
  })

  describe('getAllCategories', () => {
    it('should be able to return all categories', async () => {
      const loopValue = 3

      for (let x = 0; x < loopValue; x++) {
        const category = TestUtils.getValidCategoryDTO()

        await service.createAndSave(category)
      }

      const categories = await service.getAllCategories()

      expect(categories).toHaveLength(3)
    })
  })

  describe('findCategoryByName', () => {
    it('should be able to get a category by Name', async () => {
      const categoryDTO = TestUtils.getValidCategoryDTO()

      const newCategory = await service.createAndSave(categoryDTO)

      const foundedCategory = await service.getOneCategoryByName(
        newCategory.category
      )

      expect(foundedCategory).toHaveProperty('_id')
    })

    it('should be able Return one Exception if category not found by name', async () => {
      await expect(
        service.getOneCategoryByName('NOT EXISTS CATEGORY')
      ).rejects.toBeInstanceOf(BadRequestException)
    })
  })

  describe('findCategoryById', () => {
    it('should be able to get a category by id', async () => {
      const categoryDTO = TestUtils.getValidCategoryDTO()

      const newCategory = await service.createAndSave(categoryDTO)

      const foundedCategory = await service.getOneCategoryById(newCategory.id)

      expect(foundedCategory).toHaveProperty('_id')
    })

    it('should be able Return one Exception if category not found by id', async () => {
      await expect(
        service.getOneCategoryById('NOT EXISTS ID')
      ).rejects.toBeInstanceOf(BadRequestException)
    })
  })

  describe('updateCategory', () => {
    it('should be able to update one category', async () => {
      const newCategory = TestUtils.getValidCategoryDTO()

      const { id } = await service.createAndSave(newCategory)

      const updateCategoryValues = TestUtils.getValidUpdateCategoryDTO()

      updateCategoryValues.categoryId = id
      updateCategoryValues.description = 'Descrição atualizada'

      const category = await service.updateCategory(updateCategoryValues)

      expect(category.description).toBe('Descrição atualizada')
      expect(category.events).toHaveLength(1)
    })

    it('not should be able update category if category  not found', async () => {
      const newCategory = TestUtils.getValidCategoryDTO()

      await service.createAndSave(newCategory)

      const updateCategoryValues = TestUtils.getValidUpdateCategoryDTO()

      updateCategoryValues.categoryId = 'Invalid Id'
      updateCategoryValues.description = 'Descrição atualizada'

      await expect(
        service.updateCategory(updateCategoryValues)
      ).rejects.toBeInstanceOf(BadRequestException)
    })
  })

  describe('addPlayerToCategory', () => {
    it('should be able to add player to one Category', async () => {
      const newPlayer = TestUtils.getValidPlayerDTO()
      const newCategory = TestUtils.getValidCategoryDTO()

      const { _id: playerId } = await playerService.createPlayer(newPlayer)

      const { category: categoryName } = await service.createAndSave(
        newCategory
      )

      const category = await service.addPlayerToCategory({
        categoryName,
        playerId,
      })

      expect(category).toHaveProperty('_id')
    })

    it('not should be able to add player to category if Category does not exists', async () => {
      const newPlayer = TestUtils.getValidPlayerDTO()

      const { _id: playerId } = await playerService.createPlayer(newPlayer)

      await expect(
        service.addPlayerToCategory({
          categoryName: 'INVALID CATEGORY',
          playerId,
        })
      ).rejects.toBeInstanceOf(BadRequestException)
    })

    it('not should be able to add player to category if player does not exists', async () => {
      const newCategory = TestUtils.getValidCategoryDTO()

      const { category: categoryName } = await service.createAndSave(
        newCategory
      )

      await expect(
        service.addPlayerToCategory({
          categoryName,
          playerId: 'INVALID PLAYER ID',
        })
      ).rejects.toBeInstanceOf(BadRequestException)
    })

    it('not should be able to add player to category if player already registered in the category', async () => {
      const newPlayer = TestUtils.getValidPlayerDTO()
      const newCategory = TestUtils.getValidCategoryDTO()

      const { _id: playerId } = await playerService.createPlayer(newPlayer)
      const { category: categoryName, ...rest } = await service.createAndSave(
        newCategory
      )

      rest.players.push(playerId)

      await expect(
        service.addPlayerToCategory({
          categoryName,
          playerId,
        })
      ).rejects.toBeInstanceOf(BadRequestException)
    })
  })
})
