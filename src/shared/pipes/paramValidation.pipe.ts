import {
  ArgumentMetadata,
  BadRequestException,
  Logger,
  PipeTransform,
} from '@nestjs/common'

export class ParamValidationPipe implements PipeTransform {
  private logger = new Logger()

  async transform(
    value: string,
    { data, type }: ArgumentMetadata
  ): Promise<string> {
    this.logger.log(value)

    if (type !== 'param') {
      throw new Error('This pipe is used only with ParamDecorator')
    }

    if (!value) {
      throw new BadRequestException(`${data} is not be empty`)
    }

    return value
  }
}
