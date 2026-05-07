import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';

const gitignorePath = path.resolve(import.meta.dirname, '../.gitignore');

export default defineConfig(
    { ignores: ['prisma/**'] },
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ts.configs.recommended,
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.es2021 },
        },
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            semi: ['error', 'always'],
            indent: ['error', 4],
        },
    }
);
