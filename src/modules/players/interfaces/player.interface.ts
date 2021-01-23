export interface Player {
  readonly _id: string
  phoneNumber: string
  email: string

  name: string

  ranking: string

  rankingPosition: number

  avatarUrl: string

  createdAt: Date

  updateAt: Date
}
