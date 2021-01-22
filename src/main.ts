import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT || 3000, () =>
    console.log(`server listen om ṕrt ${process.env.PORT}`)
  )
}
bootstrap()
