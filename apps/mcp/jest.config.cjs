/** @type  moduleNameMapper: {
    '^@todos/shared$': '<rootDir>/../../packages/shared/src/index.ts',
    '^\\.\\./index\\.js$': '<rootDir>/src/index.ts',
  },port('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { module: 'CommonJS', moduleResolution: 'node' }, useESM: false }],
  },
  moduleNameMapper: {
    '^@todos/shared$': '<rootDir>/../../packages/shared/src/index.ts',
    '^\\.\\./index\\.js$': '<rootDir>/src/index.ts',
  },
};
