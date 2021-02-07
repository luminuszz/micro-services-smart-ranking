import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { updatePlayerDto } from '../dtos/updatePlayer.dto'
import { Player } from '../interfaces/player.interface'

export abstract class IPlayerRepository {
  abstract createPlayer(createPlayer: createPlayerDTO): Promise<Player>
  abstract updatePlayer(updatePlayer: updatePlayerDto): Promise<Player>
  abstract deletePlayer(id: string): Promise<void>
  abstract getPlayerById(id: string): Promise<Player | undefined>
  abstract getPlayerByEmail(id: string): Promise<Player | undefined>
  abstract getAllPlayers(): Promise<Player[]>
}
