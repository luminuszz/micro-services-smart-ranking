import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Player as PlayerInterface } from '../interfaces/player.interface'

const PlayerOptions: SchemaOptions = {
  collection: 'players',
  timestamps: true,
}

@Schema(PlayerOptions)
class Player {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  ranking: string

  @Prop({ required: true })
  rankingPosition: number

  @Prop({ required: true })
  avatarUrl: string

  @Prop({ required: true })
  phoneNumber: string
}

const PlayerSchema = SchemaFactory.createForClass(Player)

const PlayerEntityFeature = { name: Player.name, schema: PlayerSchema }

type PlayerDocument = PlayerInterface & Document

export { Player, PlayerDocument, PlayerEntityFeature }
