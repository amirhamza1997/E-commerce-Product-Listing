module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],  // Add this line
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };
  