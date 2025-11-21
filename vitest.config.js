// vite.config.js or vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        includeSource: ['src/**/*.{js,ts}'],
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['lcov', 'text'],
        },
    },
});
