import { EntityBase } from '@shared/entities/EntityBase.entity'
import { Column, Entity } from 'typeorm'

@Entity('players')
export class Player extends EntityBase {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  ranking: string

  @Column()
  rankingPosition: number

  @Column()
  avatarUrl: string

  @Column()
  phoneNumber: string
}
