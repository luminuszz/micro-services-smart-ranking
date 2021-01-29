import { Module } from '@nestjs/common'
import { PlayersModule } from './modules/players/players.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { mongooseModuleOptions } from '@Config/module.config'
import { CategoriesModule } from './modules/categories/categories.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(
      'mongodb://api_smart_ranking_db:27017/acesmartranking',
      mongooseModuleOptions
    ),
    CategoriesModule,
  ],
})
export class AppModule {}
