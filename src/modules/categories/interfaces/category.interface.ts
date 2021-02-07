import { Document } from 'mongoose'

class Event {
  _id: string
  name: string
  operation: string
  value: number
}

class Category extends Document {
  _id: string

  category: string

  description: string

  events: Event[]

  players: string[]

  createdAt: Date

  updateAt: Date
}

export { Category, Event }
