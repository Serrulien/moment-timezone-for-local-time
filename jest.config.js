module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["src/*.{js,ts}"],
  coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.eslint.json',
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  verbose: true,
};
