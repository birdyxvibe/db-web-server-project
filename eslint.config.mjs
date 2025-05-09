import { defineConfig } from 'eslint/config';
import js from '@eslint/js';

export default defineConfig([
	{ files: ['**/*.{tsx}'], plugins: { ts }, extends: ['ts/recommended'] },
	{ files: ['**/*.{tsx}'], languageOptions: { globals: { 
		window: 'readonly',
		document: 'readonly',
		console: 'readonly',
		process: 'readonly', } },
	},
	{
		rules: {
			eqeqeq: 'error',
			semi: ['error', 'always'],
			curly: 'error',
			quotes: ['error', 'single'],
			camelcase: 'warn',
			'no-multiple-empty-lines': ['warn', { max: 1 }],
			'prefer-const': 'error',
			'no-var': 'error',
			'no-implicit-coercion': 'warn',
			'no-else-return': 'warn',
			'no-shadow': 'warn',
			'no-duplicate-imports': 'warn',
			'no-nested-ternary': 'warn',
			'no-unneeded-ternary': 'warn',
			'eol-last': ['error', 'always'],
			'keyword-spacing': ['error', { 'after': true }],
			'space-before-blocks': ['error', 'always'],
			'indent': ['error', 'tab'],
			'no-mixed-spaces-and-tabs': 'error',
			'no-unexpected-multiline': 'error',
			'no-empty': ['error', { 'allowEmptyCatch': true }],
		}
	}
]);
