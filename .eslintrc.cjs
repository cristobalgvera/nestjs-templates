/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['.eslintrc.js', 'jest.config.js'],
      parserOptions: { sourceType: 'script', ecmaVersion: 'latest' },
      env: { node: true },
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      env: { node: true, jest: true },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:prettier/recommended',
        'plugin:sonarjs/recommended',
      ],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-console': 'error',
      },
      overrides: [
        {
          files: ['*.spec.ts'],
          extends: ['plugin:jest/recommended', 'plugin:jest/style'],
          rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            'sonarjs/no-identical-functions': 'off',
            'sonarjs/no-duplicate-string': 'off',
          },
        },
        {
          files: ['*.ts'],
          excludedFiles: ['*.spec.ts'],
          extends: ['plugin:@typescript-eslint/strict-type-checked'],
        },
        {
          files: ['main.ts'],
          rules: { '@typescript-eslint/no-floating-promises': 'off' },
        },
        {
          files: ['*.module.ts'],
          rules: { '@typescript-eslint/no-extraneous-class': 'off' },
        },
        {
          files: ['*.ts'],
          extends: ['plugin:rxjs/recommended'],
          rules: {
            'rxjs/finnish': 'error',
            'rxjs/no-exposed-subjects': ['error', { allowProtected: true }],
            'rxjs/no-ignored-observable': 'error',
            'rxjs/no-subject-value': 'error',
            'rxjs/no-subscribe-handlers': 'error',
            'rxjs/no-topromise': 'error',
            'rxjs/suffix-subjects': 'error',
            'rxjs/throw-error': 'error',
            'rxjs/no-implicit-any-catch': 'off',
          },
        },
      ],
    },
  ],
};
