import { IsValidObjectId } from '@shared/decorators/generalValidations.decorator'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class updatePlayerDto {
  @IsValidObjectId()
  readonly _id: string

  @IsOptional()
  @IsString()
  readonly name?: string

  @IsOptional()
  @IsEmail()
  readonly email?: string

  @IsOptional()
  @IsString()
  readonly phoneNumber?: string
}
