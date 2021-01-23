import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlayersController } from './controllers/players.controller'
import { PlayerRepository } from './repositories/player.repository'
import { PlayersService } from './services/players.service'

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
