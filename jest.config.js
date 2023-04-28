const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const COVERAGE_FILE_SUFFIX = [
  'service',
  'controller',
  'handler',
  'util',
  'provider',
  'schema',
  'guard',
  'validation',
  'helper',
  'interceptor',
  'middleware',
];

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [`**/*.(${COVERAGE_FILE_SUFFIX.join('|')}).ts`],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['<rootDir>/test/env.setup.js'],
  testEnvironment: 'node',
  // Helps to use aliases in tsconfig (@module/*)
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
};
