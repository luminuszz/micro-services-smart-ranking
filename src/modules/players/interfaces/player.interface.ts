import { IBaseEntity } from '@shared/interfaces/baseEntity.interface'

export class Player extends IBaseEntity {
  name: string

  email: string

  ranking: string

  rankingPosition: number

  avatarUrl: string

  phoneNumber: string
}
