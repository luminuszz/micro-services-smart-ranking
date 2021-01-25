import { Injectable } from '@nestjs/common'
import { EntityRepository, MongoRepository } from 'typeorm'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { updatePlayerDto } from '../dtos/updatePlayer.dto'
import { IPlayerRepository } from '../interfaces/playerRepository.inteface'
import { Player } from '../schemas/user.schema'
import { ObjectID } from 'mongodb'

@Injectable()
@EntityRepository(Player)
export class PlayerRepository
  extends MongoRepository<Player>
  implements IPlayerRepository {
  private transpileObjectId(id: string): ObjectID {
    return new ObjectID(id)
  }

  async createPlayer(createPlayer: createPlayerDTO): Promise<Player> {
    const newPlayer = this.create(createPlayer)

    await this.save(newPlayer)

    return newPlayer
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.find()
  }

  async getPlayerById(id: string): Promise<Player> {
    const foundedPlayer = await this.findOne(id)

    return foundedPlayer
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const foundedPlayer = await this.findOne({ email })

    return foundedPlayer
  }

  async updatePlayer(updatePlayer: updatePlayerDto): Promise<Player> {
    const { _id, ...fields } = updatePlayer

    await this.findOneAndUpdate({ _id }, { $set: { ...fields } })

    return await this.findOne(_id)
  }

  async deletePlayer(id: string): Promise<void> {
    await this.findOneAndDelete({ _id: id })
  }
}
