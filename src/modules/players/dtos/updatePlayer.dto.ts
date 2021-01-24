import {
  IsStringNotEmpty,
  IsValidObjectId,
} from '@shared/decorators/generalValidations.decorator'

export class updatePlayerDto {
  @IsValidObjectId()
  @IsStringNotEmpty()
  readonly _id: string

  readonly name?: string
  readonly email?: string
  readonly phoneNumber?: string
}
