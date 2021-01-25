import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common'

import { ParseObjectIDPipe } from '@shared/pipes/parsedObjectId.pipe'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { updatePlayerDto } from '../dtos/updatePlayer.dto'
import { Player } from '../interfaces/player.interface'
import { PlayersService } from '../services/players.service'

@Controller(`api/v1/players`)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(
    @Body()
    data: createPlayerDTO
  ): Promise<Player> {
    const player = await this.playersService.createPlayer(data)

    return player
  }

  @Get(':id')
  async getOnePlayerById(
    @Param('id', ParseObjectIDPipe)
    id?: string
  ): Promise<Player | undefined> {
    const player = await this.playersService.getOnePlayerById(id)

    return player
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    const players = await this.playersService.getAllPlayers()

    return players
  }

  @Put()
  async updatePlayer(
    @Body()
    updatedPlayer: updatePlayerDto
  ): Promise<Player> {
    const changedPlayer = await this.playersService.updatePlayer(updatedPlayer)
    return changedPlayer
  }

  @Delete(':id')
  async deletePlayer(
    @Param('id', ParseObjectIDPipe)
    id: string
  ): Promise<void> {
    if (!id) {
      throw new BadRequestException('id is required')
    }
    await this.playersService.deletePlayer(id)
  }
}
