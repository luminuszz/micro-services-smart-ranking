import { Test, TestingModule } from '@nestjs/testing'
import { CategoryRepository } from '../repositories/category.repository'
import { CategoriesService } from './categories.service'
import { FakeCategoryRepository } from '../repositories/mock/category.repository.fake'
import { TestUtils } from '@shared/utils/testUtils'
import { BadRequestException } from '@nestjs/common'

describe('CategoriesService', () => {
  let service: CategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoryRepository, useClass: FakeCategoryRepository },
      ],
    }).compile()

    service = module.get<CategoriesService>(CategoriesService)
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
})
