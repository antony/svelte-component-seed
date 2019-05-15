import svelte from 'rollup-plugin-svelte';
import pkg from './package.json';
import serve from 'rollup-plugin-serve';
import html from '@gen/rollup-plugin-generate-html';
import resolve from 'rollup-plugin-node-resolve';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: process.env.SERVE ? 'src/dev.js' : 'src/Component.svelte',
	output: [
		{ file: pkg.main, format: 'umd', name },
		...process.env.SERVE ? [] : [ { file: pkg.module, format: 'es' } ]
	],
	plugins: [
		svelte(),
		resolve(),
		...process.env.SERVE ? [
			html({
				publicPath: 'dist',
				template: './src/dev.html'
			}),
			serve({
				contentBase: 'dist',
				port: 12001
			})
		] : []
	]
};
