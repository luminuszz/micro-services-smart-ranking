import { ParamValidationPipe } from './paramValidation.pipe'

describe('paramValidation', () => {
  let pipe: ParamValidationPipe

  beforeEach(() => {
    pipe = new ParamValidationPipe()
  })

  describe('transform', () => {
    it('should be able to return param', async () => {
      const value = await pipe.transform('id', {
        type: 'param',
        data: 'id',
      })

      expect(value).toBe('id')
    })

    it('should not be able to  parse with current decorator is not PARAM', async () => {
      await expect(
        pipe.transform('id', {
          type: 'body',
          data: 'id',
        })
      ).rejects.toBeInstanceOf(Error)
    })
  })
})
