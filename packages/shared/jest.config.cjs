/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { module: 'CommonJS' }, useESM: false }],
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};
