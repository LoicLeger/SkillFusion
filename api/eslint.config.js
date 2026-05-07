import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig(js.configs.recommended, ts.configs.recommended, {
    languageOptions: {
        globals: { ...globals.node, ...globals.es2021 },
    },
    rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        semi: ['error', 'always'],
        indent: ['error', 4],
    },
});
