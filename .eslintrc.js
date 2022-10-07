/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    extends: [
        '@tinkoff/eslint-config-angular',
        '@tinkoff/eslint-config-angular/html',
        '@tinkoff/eslint-config-angular/rxjs',
        '@tinkoff/eslint-config-angular/promise',
        '@tinkoff/eslint-config-angular/imports',
        '@tinkoff/eslint-config-angular/line-statements',
        '@tinkoff/eslint-config-angular/member-ordering',
    ],
    ignorePatterns: ['projects/**/test.ts', '*.js', '*.json', '*.less', '*.md'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [require.resolve('./tsconfig.eslint.json')],
    },
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/no-floating-promises': 'off',
    },
};
