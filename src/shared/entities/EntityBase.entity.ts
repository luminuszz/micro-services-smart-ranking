import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

export class EntityBase {
  @ObjectIdColumn()
  readonly _id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
