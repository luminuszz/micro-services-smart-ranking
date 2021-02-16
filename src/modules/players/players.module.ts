import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersController } from './controllers/players.controller'
import { PlayersService } from './services/players.service'
import { PlayerEntityFeature } from './schemas/player.schema'
import { PlayerRepository } from './repositories'

@Module({
  imports: [MongooseModule.forFeature([PlayerEntityFeature])],
  controllers: [PlayersController],
  providers: [PlayersService, PlayerRepository],
  exports: [PlayersService],
})
export class PlayersModule {}
