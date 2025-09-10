import { defineConfig } from 'eslint/config'
import { configs } from '@jenssimon/eslint-config-base'
import tseslint from 'typescript-eslint'


export default defineConfig(
  {
    ignores: [
      '.yarn/',
      '.yalc/',
      'dist/',
    ],
  },

  configs.base,

  tseslint.configs.recommended,
  tseslint.configs.stylisticTypeChecked,
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
