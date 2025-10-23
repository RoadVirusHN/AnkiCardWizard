// eslint.config.mjs
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').FlatConfig.Config[]} */
export default [

  // TypeScript용 설정
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: pluginPrettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      semi: ['error', 'always'],
      quotes: ['warn', 'single'],
      'prettier/prettier': ['warn'],
    },
  },

  // Prettier 충돌 방지 (항상 마지막에!)
  prettier,
];
