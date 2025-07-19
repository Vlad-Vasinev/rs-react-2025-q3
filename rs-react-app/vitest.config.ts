import { defineConfig } from "vite";

export default defineConfig ({
  test: {
    globals: true, 
    environment: "jsdom", 
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts'
      ],
      thresholds: { 
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      }
    },
  },
})