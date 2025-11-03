import path from 'node:path'

import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import { configs, plugins } from 'eslint-config-airbnb-extended'
import { configs as eslintConfigs } from '@jenssimon/eslint-config-base'


const gitignorePath = path.resolve('.', '.gitignore')


const jsConfig = [
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
]

const typescriptConfig = [
  plugins.typescriptEslint,
  ...configs.base.typescript,
]


export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '.yarn/',
    ],
  },

  jsConfig,
  typescriptConfig,

  eslintConfigs.base,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            '*.js',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
