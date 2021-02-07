import { Player } from '@modules/players/schemas/player.schema'
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Category as CategoryInterface } from '../interfaces/category.interface'

const categoriesOptions: SchemaOptions = {
  collection: 'categories',
  timestamps: true,
}

@Schema()
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

  @Prop([MongooseSchema.Types.ObjectId, { ref: Player.name }])
  players: Player[]
}

const CategorySchema = SchemaFactory.createForClass(Category)

const CategoryEntityFeature = { name: Category.name, schema: CategorySchema }

type CategoryDocument = CategoryInterface & Document

export { CategoryEntityFeature, CategoryDocument, Category, Event }
