import { Injectable } from '@nestjs/common'
import { EntityRepository, MongoRepository } from 'typeorm'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { updatePlayerDto } from '../dtos/updatePlayer.dto'
import { IPlayerRepository } from '../interfaces/playerRepository.inteface'
import { Player } from '../schemas/user.schema'

@Injectable()
@EntityRepository(Player)
export class PlayerRepository
  extends MongoRepository<Player>
  implements IPlayerRepository {
  async createPlayer(createPlayer: createPlayerDTO): Promise<Player> {
    const newPlayer = this.create(createPlayer)

    await this.save(newPlayer)

    return newPlayer
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.find()
  }

  g

  async getPlayerById(id: string): Promise<Player> {
    const foundedPlayer = await this.findOne(id)

    return foundedPlayer
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const foundedPlayer = await this.findOne({ where: { email } })

    return foundedPlayer
  }

  async updatePlayer(updatePlayer: updatePlayerDto): Promise<Player> {
    const { _id, ...fields } = updatePlayer

    const { value: changedPlayer } = await this.findOneAndUpdate(
      { id: _id },
      { ...fields }
    )

    return changedPlayer
  }

  async deletePlayer(id: string): Promise<void> {
    await this.findOneAndDelete({ id })
  }
}
