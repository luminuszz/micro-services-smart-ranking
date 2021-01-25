import { ParamValidationPipe } from './paramValidation.pipe'
import * as faker from 'faker'
import { BadRequestException } from '@nestjs/common'

describe('paramValidation', () => {
  let pipe: ParamValidationPipe

  beforeEach(() => {
    pipe = new ParamValidationPipe()
  })

  describe('transform', () => {
    it('should be able to return param', () => {
      const value = pipe.transform('id', {
        type: 'param',
        data: 'id',
      })

      expect(value).toBe('id')
    })
  })
})
