import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'


// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url) // eslint-disable-line no-underscore-dangle
const __dirname = path.dirname(__filename) // eslint-disable-line no-underscore-dangle

const compat = new FlatCompat({
  baseDirectory: __dirname,
})


export default [
  {
    ignores: [
      '.yarn/',
      '.yalc/',
      'dist/',
    ],
  },

  ...fixupConfigRules(compat.config({
    parserOptions: {
      project: 'tsconfig.json',
    },
    extends: [
      '@jenssimon/base',
      'plugin:import-esm/recommended',
    ],
    overrides: [
      {
        files: [
          '*.ts',
        ],
        extends: [
          '@jenssimon/typescript',
        ],
        rules: {
          '@typescript-eslint/naming-convention': 'off',
        },
      },
    ],
  })).map((rule) => ({
    files: [
      '**/*.js',
      '**/*.ts',
    ],
    ...rule,
  })),
]
