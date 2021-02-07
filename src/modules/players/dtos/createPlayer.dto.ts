import {
  IsNumberNotEmpty,
  IsStringNotEmpty,
} from '@shared/decorators/generalValidations.decorator'
import { IsEmail } from 'class-validator'

export class createPlayerDTO {
  @IsStringNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsStringNotEmpty()
  phoneNumber: string

  @IsStringNotEmpty()
  ranking: string

  @IsNumberNotEmpty()
  rankingPosition: number
}
