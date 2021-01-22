import { Module } from '@nestjs/common'
import { PlayersModule } from './modules/players/players.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigModule } from '@Config/module.config'

@Module({
  imports: [PlayersModule, TypeOrmModule.forRoot(TypeOrmConfigModule)],
})
export class AppModule {}
