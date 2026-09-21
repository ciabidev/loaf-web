import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		conditions: ['browser']
	},
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts']
	}
});
