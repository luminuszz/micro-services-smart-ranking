import 'dotenv/config'

import { Module } from '@nestjs/common'
import { PlayersModule } from './modules/players/players.module'
import { mongooseModuleOptions } from '@Config/module.config'
import { CategoriesModule } from './modules/categories/categories.module'
import { MongooseModule } from '@nestjs/mongoose'
import { mongoUrl } from '@Config/variables'

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, mongooseModuleOptions),
    PlayersModule,
    CategoriesModule,
  ],
})
export class AppModule {}
