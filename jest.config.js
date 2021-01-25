/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts',
    '<rootDir>/src/modules/**/controllers/*.ts',
    '<rootDir>/src/**/**/*.pipe.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
}
