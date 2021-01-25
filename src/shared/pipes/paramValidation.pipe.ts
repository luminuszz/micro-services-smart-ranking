import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'
import { Console } from 'console'

export class ParamValidationPipe implements PipeTransform {
  transform(value: string, { data, type }: ArgumentMetadata): string {
    console.log('pipe value', `this ${value}`)

    if (type !== 'param') {
      throw new Error('This pipe is used only with ParamDecorator')
    }

    if (!value) {
      throw new BadRequestException(`${data} is not be empty`)
    }

    return value
  }
}
