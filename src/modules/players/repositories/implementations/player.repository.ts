import { Injectable } from '@nestjs/common'
import { createPlayerDTO } from '../../dtos/createPlayer.dto'
import { updatePlayerDto } from '../../dtos/updatePlayer.dto'
import { IPlayerRepository } from '../playerRepository.inteface'
import { PlayerDocument } from '../../schemas/player.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Player } from '../../interfaces/player.interface'

@Injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<PlayerDocument>
  ) {}

  async createPlayer(createPlayer: createPlayerDTO): Promise<Player> {
    const newPlayer = await this.playerModel.create(createPlayer)

    return newPlayer
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find()
  }

  async getPlayerById(_id: string): Promise<Player> {
    const foundedPlayer = await this.playerModel.findOne({ _id }).exec()

    return foundedPlayer
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const foundedPlayer = await this.playerModel.findOne({ email })

    return foundedPlayer
  }

  async updatePlayer(updatePlayer: updatePlayerDto): Promise<Player> {
    const { _id, ...fields } = updatePlayer

    await this.playerModel.findOneAndUpdate({ _id }, { $set: { ...fields } })

    return await this.playerModel.findOne({ _id })
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerModel.findOneAndDelete({ _id: id })
  }
}
