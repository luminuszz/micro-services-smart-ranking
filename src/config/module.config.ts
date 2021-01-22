import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmConfigModule: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'database',
  port: 27017,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  database: 'acesmartranking',
  entities: ['dist/**/schemas/*.schema.js'],
}
