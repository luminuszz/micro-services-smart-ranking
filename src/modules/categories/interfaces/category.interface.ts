import { Player } from '@modules/players/schemas/player.schema'
import { Document } from 'mongoose'

class Category extends Document {
  category: string

  description: string

  events: Event[]

  players: Player[]
}

class Event {
  _id: string
  name: string
  operation: string
  value: number
}

export { Category, Event }
