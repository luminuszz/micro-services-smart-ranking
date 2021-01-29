import { MongooseModuleOptions } from '@nestjs/mongoose'

export const mongooseModuleOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}
