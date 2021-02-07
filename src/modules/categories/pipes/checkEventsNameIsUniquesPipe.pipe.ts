import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto'

@Injectable()
export class CheckEventsNameIsUniquesPipe implements PipeTransform {
  async transform(value: UpdateCategoryDTO): Promise<UpdateCategoryDTO> {
    const { events } = value

    const eventsName = events.map(event => event.name)

    eventsName.map((currentName, index) => {
      const CheckIfArrayHaveUniqueNames =
        eventsName.indexOf(currentName) === index

      if (!CheckIfArrayHaveUniqueNames) {
        throw new BadRequestException(`${currentName} should be unique`)
      }
    })

    return value
  }
}
