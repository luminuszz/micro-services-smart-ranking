import { IsStringNotEmpty } from '@shared/decorators/generalValidations.decorator'
import { IsEmail } from 'class-validator'

export class createPlayerDTO {
  @IsStringNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email: string

  @IsStringNotEmpty()
  readonly phoneNumber: string
}
