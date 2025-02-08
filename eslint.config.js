// eslint.config.js

import js from '@eslint/js';

export default [
  js.configs.recommended, // ESLint's recommended rules
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'public',
      '**/*.min.js',
      'package-lock.json',
      'yarn.lock',
      '.env',
      'coverage',
    ],
  },
];