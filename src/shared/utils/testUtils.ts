import { createCategoryDTO } from '@modules/categories/dtos/createCategory.dto'
import { UpdateCategoryDTO } from '@modules/categories/dtos/updateCategory.dto'
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
      ranking: Faker.random.word(),
      rankingPosition: Faker.random.number(50),
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
      players: [],
    }
  }

  static getValidUpdateCategoryDTO(): UpdateCategoryDTO {
    return {
      categoryId: v4(),
      description: Faker.random.words(30),
      events: [],
    }
  }
}
