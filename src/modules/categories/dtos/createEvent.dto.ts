import {
  IsNumberNotEmpty,
  IsStringNotEmpty,
} from '@shared/decorators/generalValidations.decorator'

export class createEvent {
  @IsStringNotEmpty()
  name: string

  @IsNumberNotEmpty()
  operation: string

  @IsNumberNotEmpty()
  value: number
}
