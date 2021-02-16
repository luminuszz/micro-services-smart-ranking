import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseStringPipePipe implements PipeTransform {
  async transform(value: string): Promise<string> {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Param must be a string and not be empty')
    }

    return value
  }
}
