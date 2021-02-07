import { BadRequestException } from '@nestjs/common'
import { ParseStringPipePipe } from './parse-string-pipe.pipe'

describe('ParseStringPipePipe', () => {
  let pipe: ParseStringPipePipe

  beforeEach(() => {
    pipe = new ParseStringPipePipe()
  })

  it('should to be pass a valid param', async () => {
    const validParam = 'Valid PRAM'

    const response = await pipe.transform(validParam)

    expect(response).toBeTruthy()
    expect(typeof response === 'string').toBeTruthy()
  })

  it('not should to be pass a  param if a empty', async () => {
    await expect(pipe.transform('')).rejects.toBeInstanceOf(BadRequestException)
  })

  it('not should to be pass a  param if  not a string', async () => {
    await expect(pipe.transform(20 as never)).rejects.toBeInstanceOf(
      BadRequestException
    )
  })
})
