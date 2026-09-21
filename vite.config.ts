import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		conditions: ['browser']
	},
	plugins: [
		sveltekit(),
		Icons({
			autoInstall: true,
			compiler: 'svelte'
		})
	],
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts']
	}
});
