import { IsValidObjectId } from '@shared/decorators/generalValidations.decorator'
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'
import { Event } from '../interfaces/category.interface'

export class UpdateCategoryDTO {
  @IsValidObjectId()
  categoryId: string

  @IsOptional()
  @IsString()
  description: string

  @IsArray()
  @ArrayMinSize(1)
  events: Event[]
}
