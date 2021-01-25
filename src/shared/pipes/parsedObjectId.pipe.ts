import {
  BadRequestException,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common'
import { ObjectID } from 'mongodb'

export class ParseObjectIDPipe implements PipeTransform {
  async transform(id: string): Promise<ObjectID> {
    const validateObjectId = ObjectID.isValid(id)

    console.log('validateObjectId', validateObjectId)

    if (!validateObjectId) {
      throw new UnauthorizedException('is not valid id')
    }

    return new ObjectID(id)
  }
}
