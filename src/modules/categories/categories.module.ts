import { Module } from '@nestjs/common'
import { CategoriesService } from './services/categories.service'
import { CategoriesController } from './controllers/categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryRepository } from './repositories/category.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
