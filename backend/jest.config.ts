import type { Config } from "jest";

const config: Config = {
  testTimeout: 50000,
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  preset: "ts-jest",
  setupFiles: ["dotenv/config"],

  setupFilesAfterEnv: ["./src/__tests__/setup.ts"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/build/", "awsS3Service.test.ts"],
};

export default config;
