import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ObjectID } from 'mongodb'

export class ParseObjectIDPipe implements PipeTransform {
  transform(id: string): ObjectID {
    if (!id) {
      throw new BadRequestException('id is not be empty')
    }

    const validateObjectId = ObjectID.isValid(id)

    if (!validateObjectId) {
      throw new BadRequestException('is not valid id')
    }

    return new ObjectID(id)
  }
}
