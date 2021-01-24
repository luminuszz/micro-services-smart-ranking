import {
  IsStringNotEmpty,
  IsValidObjectId,
} from '@shared/decorators/generalValidations.decorator'
import { IsEmail, IsPhoneNumber } from 'class-validator'

export class createPlayerDTO {
  @IsStringNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email: string

  @IsPhoneNumber('BR')
  readonly phoneNumber: string
}
