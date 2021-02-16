import { IPlayerRepository } from './playerRepository.inteface'
import { PlayerRepository as MongoosePlayerRepository } from './implementations/player.repository'
import { injectResolver } from '@shared/utils/resolverToken'
import { FakePlayerRepository } from './mock/player.repository.fake'

export const PlayerRepository = injectResolver(IPlayerRepository, {
  development: MongoosePlayerRepository,
  testing: FakePlayerRepository,
})
