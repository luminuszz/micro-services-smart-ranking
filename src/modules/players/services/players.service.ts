import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { Player } from '../interfaces/player.interface'
import { v4 as uuidV4 } from 'uuid'
import { formatterJSON } from '@shared/utils/formatters'
import * as Faker from 'faker'
import { updatePlayerDto } from '../dtos/updatePlayer.dto'

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name)

  private players: Player[] = []

  async createPlayer(createPlayer: createPlayerDTO): Promise<Player> {
    const { email, name, phoneNumber } = createPlayer

    const checkPlayerExists = await this.getOnePlayerByEmail(email)

    if (checkPlayerExists) {
      throw new BadRequestException('This email has already been registered')
    }

    const newPlayer: Player = {
      _id: uuidV4(),
      name,
      email,
      phoneNumber,
      raking: Faker.commerce.product(),
      avatarUrl: Faker.internet.avatar(),
      rakingPosition: Faker.random.number(2),
    }

    this.players.push(newPlayer)

    return newPlayer
  }

  async updatePlayer(updatePlayer: updatePlayerDto): Promise<Player> {
    const { _id, ...fields } = updatePlayer

    const checkPlayerExists = await this.getOnePlayerById(_id)

    /*    if (!checkPlayerExists) {
      throw new BadRequestException('Player not found')
    } */

    const changedPlayer = Object.assign(checkPlayerExists, fields)

    const findIndex = this.players.findIndex(
      currentPlayer => currentPlayer._id === _id
    )

    if (findIndex >= 0) {
      this.players[findIndex] = changedPlayer
    }

    return changedPlayer
  }

  async getOnePlayerByEmail(email: string): Promise<Player | undefined> {
    const player = this.players.find(player => player.email === email)

    return player
  }

  async getOnePlayerById(id: string): Promise<Player | undefined> {
    const player = this.players.find(player => player._id === id)

    return player
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.players
  }

  async deletePlayer(id: string): Promise<void> {
    const filteredPlayers = this.players.filter(player => player._id !== id)

    this.players = filteredPlayers
  }
}
