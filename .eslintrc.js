/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      env: { node: true, jest: true },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
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
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      overrides: [
        {
          files: ['main.ts'],
          rules: { '@typescript-eslint/no-floating-promises': 'off' },
        },
      ],
    },
  ],
};
