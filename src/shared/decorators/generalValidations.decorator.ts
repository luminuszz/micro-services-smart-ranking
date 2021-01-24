/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators } from '@nestjs/common'
import { IsNotEmpty, IsString, registerDecorator } from 'class-validator'
import { ObjectID } from 'mongodb'

export const IsStringNotEmpty = (): Function =>
  applyDecorators(IsNotEmpty(), IsString())

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
