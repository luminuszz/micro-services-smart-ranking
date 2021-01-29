import { Player } from '@modules/players/schemas/player.schema'
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose'
import { Document } from 'mongoose'

const categoriesOptions: SchemaOptions = {
  collection: 'categories',
  timestamps: true,
}

class Event {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  operation: string

  @Prop({ required: true })
  value: number
}

@Schema(categoriesOptions)
class Category {
  @Prop({ unique: true, required: true })
  category: string

  @Prop({ required: true })
  description: string

  @Prop([Event])
  events: Event[]

  @Prop([Player])
  players: Player[]
}

const CategorySchema = SchemaFactory.createForClass(Category)

const CategoryEntityFeature = { name: Category.name, schema: CategorySchema }

type CategoryDocument = Category & Document

export { CategoryEntityFeature, CategoryDocument, Category, Event }
