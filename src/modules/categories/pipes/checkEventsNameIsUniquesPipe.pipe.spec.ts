import { BadRequestException } from '@nestjs/common'
import { Event } from '../interfaces/category.interface'
import { CheckEventsNameIsUniquesPipe } from './checkEventsNameIsUniquesPipe.pipe'

describe('ChekEventsNameisUniquesPipe', () => {
  let pipe: CheckEventsNameIsUniquesPipe

  beforeEach(() => {
    pipe = new CheckEventsNameIsUniquesPipe()
  })

  it('should be able to pass if Events name are uniques', async () => {
    const events: Event[] = [
      { _id: 'algo', name: 'TESTE1', operation: 'some', value: 800 },
      { _id: 'algo', name: 'TESTE2', operation: 'some', value: 800 },
      { _id: 'algo', name: 'TESTE3', operation: 'some', value: 800 },
    ]

    const response = await pipe.transform({
      categoryId: 'teste',
      description: 'algo',
      events,
    })

    expect(response.events).toHaveLength(3)
  })

  it('should not be able to pass if EventsName are equals', async () => {
    const events: Event[] = [
      { _id: 'algo', name: 'TESTE1', operation: 'some', value: 800 },
      { _id: 'algo', name: 'TESTE1', operation: 'some', value: 800 },
      { _id: 'algo', name: 'TESTE1', operation: 'some', value: 800 },
    ]

    await expect(
      pipe.transform({
        categoryId: 'teste',
        description: 'algo',
        events,
      })
    ).rejects.toBeInstanceOf(BadRequestException)
  })
})
