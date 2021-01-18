/* eslint-disable @typescript-eslint/ban-types */
import { Test, TestingModule } from '@nestjs/testing'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { PlayersService } from './players.service'
import * as faker from 'faker'

describe('PlayersService', () => {
  let service: PlayersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService],
    }).compile()

    service = module.get<PlayersService>(PlayersService)
  })

  describe('createPlayer', () => {
    it('should be able to create a new user', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      const createdPlayer = await service.createUpdatePlayers(newPlayer)

      const currentPlayers = await service.getAllPlayers()

      expect(createdPlayer).toHaveProperty('_id')
      expect(currentPlayers).toHaveLength(1)
    })
  })
})
