/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(service|controller|handler).ts'],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['<rootDir>/test/env.setup.js'],
  testEnvironment: 'node',
};
