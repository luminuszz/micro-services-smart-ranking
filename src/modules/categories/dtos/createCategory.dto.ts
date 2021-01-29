import {
  IsStringNotEmpty,
  IsNumberNotEmpty,
  IsArrayNotEmpty,
} from '@shared/decorators/generalValidations.decorator'

import { createEvent } from './createEvent.dto'

export class createCategoryDTO {
  @IsStringNotEmpty()
  category: string

  @IsStringNotEmpty()
  description: string

  @IsNumberNotEmpty()
  value: number

  @IsArrayNotEmpty()
  events: createEvent[]
}
