import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { Player } from '../interfaces/player.interface'
import { PlayersService } from '../services/players.service'

@Controller(`api/v1/players`)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  private logger = new Logger(PlayersController.name)

  @Post()
  public async createUpdatePlayer(
    @Body()
    data: createPlayerDTO
  ): Promise<Player> {
    const player = await this.playersService.createUpdatePlayers(data)

    return player
  }

  @Get()
  async getPlayers(@Query('id') id?: string): Promise<Player[] | Player> {
    if (id) {
      this.logger.debug(id)
      const player = await this.playersService.getOnePlayer(id)

      return player
    }

    const player = await this.playersService.getAllPlayers()

    return player
  }
}
