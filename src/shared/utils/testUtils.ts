import { createPlayerDTO } from '@modules/players/dtos/createPlayer.dto'
import * as Faker from 'faker'

export class TestUtils {
  static getValidPlayerDTO(): createPlayerDTO {
    return {
      email: Faker.internet.email(),
      name: Faker.name.firstName(),
      phoneNumber: Faker.phone.phoneNumber(),
    }
  }
}
