import { Test, TestingModule } from '@nestjs/testing'
import { PlayersService } from '../services/players.service'
import { PlayersController } from './players.controller'

describe('PlayersController', () => {
  let controller: PlayersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService],
      controllers: [PlayersController],
    }).compile()

    controller = module.get<PlayersController>(PlayersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
