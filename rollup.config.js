import svelte from 'rollup-plugin-svelte';
import pkg from './package.json';
import browsersync from "rollup-plugin-browsersync";

const watch = process.env.WATCH

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

const mainpath = watch ? pkg.main.replace('dist', 'docs') : pkg.main

export default {
	input: 'src/component.svelte',
	output: [
		{ file: pkg.module, 'format': 'es' },
		{ file: mainpath, 'format': 'umd', name }
	],
	plugins: [
		svelte(),

		watch && browsersync({ server: "docs" })
	]
};

