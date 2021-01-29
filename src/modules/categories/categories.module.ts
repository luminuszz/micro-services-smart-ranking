import { Module } from '@nestjs/common'
import { CategoriesService } from './services/categories.service'
import { CategoriesController } from './controllers/categories.controller'
import { CategoryEntityFeature } from './schemas/category.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryRepository } from './repositories/category.repository'

@Module({
  imports: [MongooseModule.forFeature([CategoryEntityFeature])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
