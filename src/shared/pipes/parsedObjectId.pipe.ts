import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ObjectID } from 'mongodb'

export class ParseObjectID implements PipeTransform {
  transform(id: string): string {
    const validateObjectId = ObjectID.isValid(id)

    if (!validateObjectId) {
      throw new BadRequestException('is not valid id')
    }

    return id
  }
}
