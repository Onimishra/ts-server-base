/* eslint-disable no-undef */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'quotes': [2, 'single'],
    'no-trailing-spaces': 2,

    'import/order': ['error', {
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      pathGroups: [
        { pattern: 'Container', group: 'internal' },
        { pattern: 'global-errors/**', group: 'internal' },
        { pattern: 'configuration', group: 'internal' },

        { pattern: 'delivery/**', group: 'parent', position: 'before' },

        { pattern: '{domain/action/**,domain/operation/**}', group: 'parent', position: 'before' },
        { pattern: '{domain/entity/**,domain/value/**}', group: 'parent', position: 'before' },
        { pattern: 'domain/**', group: 'parent', position: 'before' },

        { pattern: 'external/**', group: 'parent', position: 'before' },
      ],
    }],
  },
};