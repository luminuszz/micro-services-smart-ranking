import { Abstract, Provider, Type } from '@nestjs/common'

type AbstractType<T = unknown> = string | symbol | Type<T> | Abstract<T>

type state<T> = {
  development: Type<T>
  testing: Type<T>
}

export function injectResolver(
  abstraction: AbstractType,
  { development, testing }: state<unknown>
): Provider {
  const provide = abstraction

  console.log('process.env.APP_ENV', process.env.APP_ENV)

  switch (process.env.APP_ENV) {
    case 'development':
      return { provide, useClass: development }

    case 'testing':
      return {
        provide,
        useClass: testing,
      }

    default:
      return { provide, useClass: testing }
  }
}
