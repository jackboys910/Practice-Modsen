import js from '@eslint/js'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import babelParser from '@babel/eslint-parser'

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: babelParser,
      globals: {
        browser: true,
      },
    },
    plugins: {
      react: react,
      prettier: prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          endOfLine: 'auto',
        },
      ],
      'react/prop-types': 'off',
      'simple-import-sort/imports': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignores: ['node_modules/**', 'dist/**', 'eslint.config.js'],
  },
]
