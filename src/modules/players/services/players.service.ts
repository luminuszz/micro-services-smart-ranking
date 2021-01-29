import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { createPlayerDTO } from '../dtos/createPlayer.dto'

import { updatePlayerDto } from '../dtos/updatePlayer.dto'

import { PlayerRepository } from '../repositories/player.repository'
import { Player } from '../interfaces/player.interface'

@Injectable()
export class PlayersService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  private readonly logger = new Logger(PlayersService.name)

  async createPlayer(createPlayer: createPlayerDTO): Promise<Player> {
    const { email, name, phoneNumber } = createPlayer

    const checkPlayerExists = await this.getOnePlayerByEmail(email)

    if (checkPlayerExists) {
      throw new BadRequestException('This email has already been registered')
    }

    const newPlayer = await this.playerRepository.createPlayer({
      email,
      name,
      phoneNumber,
    })

    return newPlayer
  }

  async updatePlayer(updatePlayer: updatePlayerDto): Promise<Player> {
    const { _id } = updatePlayer

    const checkPlayerExists = await this.getOnePlayerById(_id)

    if (!checkPlayerExists) {
      throw new BadRequestException('Player not found')
    }

    const changedPlayer = await this.playerRepository.updatePlayer(updatePlayer)

    return changedPlayer as Player
  }

  async getOnePlayerByEmail(email: string): Promise<Player | undefined> {
    const player = this.playerRepository.getPlayerByEmail(email)

    return player
  }

  async getOnePlayerById(id: string): Promise<Player | undefined> {
    const player = this.playerRepository.getPlayerById(id)

    return player
  }

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.playerRepository.getAllPlayers()

    return players
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerRepository.deletePlayer(id)
  }
}
