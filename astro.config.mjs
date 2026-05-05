// @ts-check

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const sitemapExcludedPathnames = new Set([
	'/admin/',
	'/credits/',
	'/favicon-lab/',
	'/social-preview-variants/',
]);

// https://astro.build/config
export default defineConfig({
	site: 'https://ateleiatherapy.gr',
	base: '/',
	output: 'static',
	build: {
		inlineStylesheets: 'always',
	},
	integrations: [
		react(),
		sitemap({
			filter: (page) => !sitemapExcludedPathnames.has(new URL(page).pathname),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
