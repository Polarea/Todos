/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
  '^@todos/shared$': '<rootDir>/../../packages/shared/src/index.ts',
  '^@todos/shared$': '<rootDir>/../../packages/shared/src/index.ts', // This line is added
  },
  globals: {
    'ts-jest': {
  tsconfig: { module: 'CommonJS', moduleResolution: 'node' },
      useESM: false,
    },
  },
};
