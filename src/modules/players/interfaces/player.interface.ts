import { Document } from 'mongoose'

export class Player extends Document {
  _id: string

  name: string

  email: string

  ranking: string

  rankingPosition: number

  avatarUrl: string

  phoneNumber: string

  createdAt: Date
  updateAt: Date
}
