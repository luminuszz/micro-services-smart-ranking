/* eslint-disable @typescript-eslint/ban-types */
import { Test, TestingModule } from '@nestjs/testing'
import { createPlayerDTO } from '../dtos/createPlayer.dto'
import { PlayersService } from './players.service'
import * as faker from 'faker'
import { BadRequestException } from '@nestjs/common'
import { TestUtils } from '@shared/utils/testUtils'
import { updatePlayerDto } from '../dtos/updatePlayer.dto'

describe('PlayersService', () => {
  let service: PlayersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService],
    }).compile()

    service = module.get<PlayersService>(PlayersService)
  })

  describe('createPlayer', () => {
    it('should be able to create a new player', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      const createdPlayer = await service.createPlayer(newPlayer)

      const currentPlayers = await service.getAllPlayers()

      expect(createdPlayer).toHaveProperty('_id')
      expect(currentPlayers).toHaveLength(1)
    })

    it('not should be able to create a new player if email already exists', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      const { email: alreadyRegisterEmail } = await service.createPlayer(
        newPlayer
      )

      const newPlayer2: createPlayerDTO = {
        email: alreadyRegisterEmail,
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      await expect(service.createPlayer(newPlayer2)).rejects.toBeInstanceOf(
        BadRequestException
      )
    })
  })

  describe('getAllPlayers', () => {
    it('should be able to get all players', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }
      const newPlayer2: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      await service.createPlayer(newPlayer)
      await service.createPlayer(newPlayer2)

      const currentPlayers = await service.getAllPlayers()

      expect(currentPlayers).toHaveLength(2)
    })
  })

  describe('getOnePlayerByEmail', () => {
    it('should be able to get one Player', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      const savedPlayer = await service.createPlayer(newPlayer)

      const currentPlayer = await service.getOnePlayerByEmail(savedPlayer.email)

      expect(currentPlayer).toHaveProperty('_id')
    })

    it('not should be able to get one player if him not exists', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }
      await service.createPlayer(newPlayer)

      const findPlayer = await service.getOnePlayerByEmail('INVALID_EMAIL')

      expect(findPlayer).toBe(undefined)
    })
  })

  describe('getOnePlayerById', () => {
    it('should be able to get one Player', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      const savedPlayer = await service.createPlayer(newPlayer)

      const currentPlayer = await service.getOnePlayerById(savedPlayer._id)

      expect(currentPlayer).toHaveProperty('_id')
    })

    it('not should be able to get one player if him not exists', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }
      await service.createPlayer(newPlayer)

      const findPlayer = await service.getOnePlayerById('INVALID_ID')

      expect(findPlayer).toBe(undefined)
    })
  })

  describe('deletePlayer', () => {
    it('should able to delete one user', async () => {
      const newPlayer: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      const newPlayer2: createPlayerDTO = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
      }

      await service.createPlayer(newPlayer)
      const player = await service.createPlayer(newPlayer2)

      await service.deletePlayer(player._id)

      const players = await service.getAllPlayers()

      expect(players).toHaveLength(1)
    })
  })

  describe('updatePlayer', () => {
    it('should be able to update player', async () => {
      const newPlayer = TestUtils.getValidPlayerDTO()

      const { _id } = await service.createPlayer(newPlayer)

      const updatePlayer: updatePlayerDto = {
        _id,
        name: 'carlos almeida',
      }

      const changedPlayer = await service.updatePlayer(updatePlayer)

      expect(changedPlayer.name).toBe('carlos almeida')
    })
  })
})
