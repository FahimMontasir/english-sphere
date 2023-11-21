/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,

  clearMocks: true,

  // collectCoverage: true,
  // coverageDirectory: 'coverage',

  // coveragePathIgnorePatterns: ['/node_modules/', '/src/doc/'],

  // coverageProvider: 'v8',

  // coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'ts'],
  roots: ['<rootDir>/src'],
};
