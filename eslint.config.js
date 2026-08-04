// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  {
    ignores: ['dist/**', '.angular/**', 'coverage/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      // tsRecommended trae esta regla en 'warn'; se sube a 'error' para que
      // ninguna regla quede en warn (ver angular.json, target lint, maxWarnings: 0).
      '@angular-eslint/use-lifecycle-interface': 'error',

      // Reglas puntuales de angular.configs.tsAll que refuerzan AGENTS.md
      // sin arrastrar el resto de tsAll (que incluye reglas en conflicto,
      // como limitar templates inline a pocas líneas).
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/prefer-signal-model': 'error',
      '@angular-eslint/prefer-service-decorator': 'error',
      '@angular-eslint/no-uncalled-signals': 'error',
      '@angular-eslint/inject-at-top': 'error',
      '@angular-eslint/consistent-component-styles': ['error', 'string'],

      // Angular components/services are commonly empty classes whose only
      // members come from the decorator (DI metadata, template binding).
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateAll],
    rules: {
      // Requires an i18n attribute on every element with text — only useful
      // once the app actually adopts Angular i18n; too noisy otherwise.
      '@angular-eslint/template/i18n': 'off',
    },
  },
  eslintConfigPrettier,
]);
