import { injectResolver } from '@shared/utils/resolverToken'
import { CategoryRepository as MongooseCategoryRepository } from './implementations/category.repository'
import { FakeCategoryRepository } from './mock/category.repository.fake'
import { ICategoryRepository } from './categoryRepository.interface'

export const CategoryRepository = injectResolver(ICategoryRepository, {
  development: MongooseCategoryRepository,
  testing: FakeCategoryRepository,
})
