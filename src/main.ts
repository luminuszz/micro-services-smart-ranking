import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as helmet from 'helmet'

import 'dotenv/config'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { GlobalException } from '@shared/filters/customExcepetion.filter'

async function CreateCustomAppInstance(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new GlobalException())

  app.use(helmet())

  return app
}

async function bootstrap() {
  const app = await CreateCustomAppInstance()

  await app.listen(process.env.PORT || 3000, () =>
    console.log(`server listen om ṕrt ${process.env.PORT}`)
  )
}
bootstrap()
