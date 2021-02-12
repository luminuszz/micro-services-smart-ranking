import 'dotenv/config'

import { Module } from '@nestjs/common'
import { PlayersModule } from './modules/players/players.module'
import { mongooseModuleOptions } from '@Config/module.config'
import { CategoriesModule } from './modules/categories/categories.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, mongooseModuleOptions),
    PlayersModule,
    CategoriesModule,
  ],
})
export class AppModule {}
