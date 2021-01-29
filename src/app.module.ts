import { Module } from '@nestjs/common'
import { PlayersModule } from './modules/players/players.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigModule } from '@Config/module.config'
import { CategoriesModule } from './modules/categories/categories.module'

@Module({
  imports: [
    PlayersModule,
    TypeOrmModule.forRoot(TypeOrmConfigModule),
    CategoriesModule,
  ],
})
export class AppModule {}
