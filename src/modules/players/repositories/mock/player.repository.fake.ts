import { createPlayerDTO } from '@modules/players/dtos/createPlayer.dto'
import { updatePlayerDto } from '@modules/players/dtos/updatePlayer.dto'
import { IPlayerRepository } from '../playerRepository.inteface'
import { Player } from '@modules/players/interfaces/player.interface'
import * as Faker from 'faker'
import { v4 as uuidV4 } from 'uuid'

export class FakePlayerRepository implements IPlayerRepository {
  private players: Player[] = []

  async getAllPlayers(): Promise<Player[]> {
    return this.players
  }

  async createPlayer(createPlayer: createPlayerDTO): Promise<Player> {
    const { email, name, phoneNumber } = createPlayer

    const newPlayer = {
      email,
      name,
      phoneNumber,
      _id: uuidV4(),
      createdAt: new Date(),
      updateAt: new Date(),
      ranking: Faker.random.words(),
      avatarUrl: Faker.internet.avatar(),
      rankingPosition: Faker.random.number(),
    } as Player

    this.players.push(newPlayer)

    return newPlayer
  }

  async updatePlayer(updatePlayer: updatePlayerDto): Promise<Player> {
    const { _id, ...fields } = updatePlayer

    const currentPlayerIndex = this.players.findIndex(
      player => player._id === _id
    )

    const changedPlayer = Object.assign(
      this.players[currentPlayerIndex],
      fields
    )

    this.players[currentPlayerIndex] = changedPlayer

    return changedPlayer
  }

  async deletePlayer(id: string): Promise<void> {
    const filteredPlayer = this.players.filter(player => player._id !== id)

    this.players = filteredPlayer
  }

  async getPlayerById(id: string): Promise<Player> {
    const player = this.players.find(player => player._id === id)

    return player
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const player = this.players.find(player => player.email === email)

    return player
  }
}
