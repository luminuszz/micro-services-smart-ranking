import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { updatePlayerDto } from '../dtos/updatePlayer.dto'
import { Player } from '../schemas/user.schema'

export interface IPlayerRepository {
  createPlayer(createPlayer: createPlayerDTO): Promise<Player>
  updatePlayer(updatePlayer: updatePlayerDto): Promise<Player>
  deletePlayer(id: string): Promise<void>
  getPlayerById(id: string): Promise<Player | undefined>
  getPlayerByEmail(id: string): Promise<Player | undefined>
  getAllPlayers(): Promise<Player[]>
}
