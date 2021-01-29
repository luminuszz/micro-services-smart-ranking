import { createCategoryDTO } from '@modules/categories/dtos/createCategory.dto'
import { Event } from '@modules/categories/interfaces/category.interface'
import { createPlayerDTO } from '@modules/players/dtos/createPlayer.dto'
import * as Faker from 'faker'
import { v4 } from 'uuid'

export class TestUtils {
  static getValidPlayerDTO(): createPlayerDTO {
    return {
      email: Faker.internet.email(),
      name: Faker.name.firstName(),
      phoneNumber: Faker.phone.phoneNumber(),
    }
  }

  static getValidCategoryDTO(): createCategoryDTO {
    const newEvent: Event = {
      _id: v4(),
      name: Faker.name.jobTitle(),
      operation: Faker.random.word(),
      value: Faker.random.number(),
    }

    return {
      category: Faker.name.title(),
      description: Faker.random.words(50),
      events: [newEvent],
      value: Faker.random.number(),
    }
  }
}
