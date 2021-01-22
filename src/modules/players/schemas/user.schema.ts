import { Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class Player {
  @ObjectIdColumn()
  _id: string
}
