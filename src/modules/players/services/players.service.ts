import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { Player } from '../interfaces/player.interface'
import { v4 as uuidV4 } from 'uuid'

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name)

  private players: Player[] = []

  private createPlayer(createPlayer: createPlayerDTO): Player {
    const { email, name, phoneNumber } = createPlayer

    const newPlayer: Player = {
      _id: uuidV4(),
      name,
      email,
      phoneNumber,
      raking: 'tese',
      avatarUrl: 'algo aqui',
      rakingPosition: 5,
    }
    this.logger.log(newPlayer)
    this.players.push(newPlayer)
    return newPlayer
  }

  public async createUpdatePlayers(
    createPlayer: createPlayerDTO
  ): Promise<Player> {
    const newPlayer = this.createPlayer(createPlayer)

    return newPlayer
  }

  async getOnePlayer(id: string): Promise<Player> {
    const player = this.players.find(player => player._id === id)

    if (!player) {
      throw new BadRequestException('Player not found')
    }

    return player
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.players
  }
}
