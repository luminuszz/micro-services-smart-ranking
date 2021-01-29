import { Player } from '@modules/players/interfaces/player.interface'
import {
  IsStringNotEmpty,
  IsNumberNotEmpty,
  IsArrayNotEmpty,
} from '@shared/decorators/generalValidations.decorator'
import { IsArray, IsOptional } from 'class-validator'

import { createEvent } from './createEvent.dto'

export class createCategoryDTO {
  @IsStringNotEmpty()
  category: string

  @IsStringNotEmpty()
  description: string

  @IsArrayNotEmpty()
  events: createEvent[]

  @IsOptional()
  @IsArray()
  players: Player[]
}
