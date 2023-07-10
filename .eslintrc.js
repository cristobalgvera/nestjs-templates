/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.js', 'jest.config.js'],
      parserOptions: { sourceType: 'script', ecmaVersion: 'latest' },
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
      ],
    },
    {
      files: ['*.ts'],
      excludedFiles: ['*.spec.ts'],
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      overrides: [
        {
          files: ['main.ts'],
          rules: { '@typescript-eslint/no-floating-promises': 'off' },
        },
        {
          files: ['*.module.ts'],
          rules: { '@typescript-eslint/no-extraneous-class': 'off' },
        },
      ],
    },
  ],
};
