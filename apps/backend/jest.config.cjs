/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'js'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { module: 'CommonJS', moduleResolution: 'node' }, useESM: false }],
  },
  moduleNameMapper: {
    '^@todos/shared$': '<rootDir>/../../packages/shared/src/index.ts',
    '^\\.\\./index\\.js$': '<rootDir>/src/index.ts',
  },
};
