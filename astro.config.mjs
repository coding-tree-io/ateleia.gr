// @ts-check

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://coding-tree-io.github.io',
	base: '/ateleia.gr',
	output: 'static',
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
	},
});
