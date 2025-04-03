// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          arrowParens: 'always',
          printWidth: 100,
          endOfLine: 'lf',
          jsxSingleQuote: false,
          bracketSpacing: true,
          proseWrap: 'preserve',
          overrides: [
            {
              files: '*.ts',
              options: {
                parser: 'typescript',
              },
            },
            {
              files: '*.tsx',
              options: {
                parser: 'typescript',
              },
            },
          ],
        },
      ],
    },
  }
);
