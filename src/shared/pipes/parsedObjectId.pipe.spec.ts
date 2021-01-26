import { ParseObjectIDPipe } from './parsedObjectId.pipe'
import { ObjectID } from 'mongodb'
import { UnauthorizedException } from '@nestjs/common'
import * as faker from 'faker'

describe('ParseObjectIDPipe', () => {
  let pipe: ParseObjectIDPipe

  beforeEach(() => {
    pipe = new ParseObjectIDPipe()
  })

  describe('transform', () => {
    it('should be able to pass  a valid objectID', async () => {
      const fakeObjectId = ObjectID.createFromTime(2)

      const value = await pipe.transform(fakeObjectId.toHexString())

      expect(ObjectID.isValid(value)).toBe(true)
    })

    it('not should be able to pass if is invalid id', async () => {
      const invalidID = faker.random.uuid()

      await expect(pipe.transform(invalidID)).rejects.toBeInstanceOf(
        UnauthorizedException
      )
    })
  })
})
