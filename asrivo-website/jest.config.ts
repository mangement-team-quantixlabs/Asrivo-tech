import type { Config } from "jest";

const config: Config = {
  // Use ts-jest to transform TypeScript files
  preset: "ts-jest",

  // Run in Node environment (not jsdom) since we're testing server-side Route Handlers
  testEnvironment: "node",

  // Where Jest looks for tests
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],

  // Path aliases matching tsconfig.json `@/*`
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Setup file runs before each test suite
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // TypeScript config for ts-jest
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          // Relax strictness for test files
          strict: false,
          esModuleInterop: true,
        },
      },
    ],
  },

  // Coverage settings
  collectCoverageFrom: [
    "app/api/**/*.ts",
    "lib/supabase/**/*.ts",
    "lib/validations/**/*.ts",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],

  // Ignore Next.js build output
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  // Show individual test results
  verbose: true,
};

export default config;
