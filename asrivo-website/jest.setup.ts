/**
 * jest.setup.ts
 *
 * Global setup that runs before every test file.
 * - Clears all mocks between tests to prevent bleed-over
 * - Provides a reusable Supabase mock factory used across test files
 */

// Automatically clear mock calls, instances, contexts, and results before every test
beforeEach(() => {
  jest.clearAllMocks();
});
