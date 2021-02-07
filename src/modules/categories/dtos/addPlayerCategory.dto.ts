import {
  IsStringNotEmpty,
  IsValidObjectId,
} from '@shared/decorators/generalValidations.decorator'

export class AddPlayerCategoryParamsDTO {
  @IsStringNotEmpty()
  categoryName: string

  @IsValidObjectId()
  playerId: string
}
