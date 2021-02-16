/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators } from '@nestjs/common'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  registerDecorator,
} from 'class-validator'
import { ObjectID } from 'mongodb'

export const IsNumberNotEmpty = (): Function =>
  applyDecorators(IsNotEmpty(), IsNumber())

export const IsStringNotEmpty = (): Function =>
  applyDecorators(IsNotEmpty(), IsString())

export const IsArrayNotEmpty = (length = 1): Function =>
  applyDecorators(IsArray(), ArrayMinSize(length))

export const IsValidObjectId = (value?: string): Function => (
  object: Object,
  propertyName: string
) => {
  registerDecorator({
    name: 'IsValidObjectId',
    target: object.constructor,
    propertyName: propertyName,
    constraints: [value],
    validator: {
      validate: (value: string) => ObjectID.isValid(value),
    },
    options: { message: 'is not a valid id' },
  })
}
