import { Player } from '@modules/players/schemas/player.schema'
import { EntityBase } from '@shared/entities/EntityBase.entity'
import { Column, Entity } from 'typeorm'

class Event {
  @Column()
  name: string

  @Column()
  operation: string

  @Column()
  value: number

  constructor(name: string, operation: string, value: number) {
    this.name = name
    this.operation = operation
    this.value = value
  }
}

@Entity('categories')
export class Category extends EntityBase {
  @Column()
  readonly category: string

  @Column()
  description: string

  @Column(_type => Event)
  events: Event[]

  @Column(_type => Player)
  players: Player[]
}
