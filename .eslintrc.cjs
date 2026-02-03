module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['node_modules', 'dist', 'build', '.eslintrc.cjs'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {},
  overrides: [
    {
      files: ['app/src/**/*.{ts,tsx}', 'api/src/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
      },
    },
  ],
};
