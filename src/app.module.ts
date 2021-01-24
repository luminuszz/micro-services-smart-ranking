import { Module } from '@nestjs/common'
import { PlayersModule } from './modules/players/players.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigModule } from '@Config/module.config'
import { APP_FILTER } from '@nestjs/core'
import { GlobalException } from '@shared/filters/customExcepetion.filter'

@Module({
  imports: [PlayersModule, TypeOrmModule.forRoot(TypeOrmConfigModule)],
})
export class AppModule {}
