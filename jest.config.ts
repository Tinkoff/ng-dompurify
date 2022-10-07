import {resolve} from 'path';
import {pathsToModuleNameMapper} from 'ts-jest';

const {compilerOptions} = require(resolve(`./tsconfig.json`));

process.env.TZ = `Europe/Moscow`;
process.env.FORCE_COLOR = `true`;
process.env.TS_JEST_DISABLE_VER_CHECKER = `true`;

module.exports = {
    preset: 'jest-preset-angular',
    testMatch: ['<rootDir>/**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    coverageDirectory: '<rootDir>/../../coverage/demo',
    collectCoverageFrom: ['<rootDir>/projects/demo/**/*.ts', '!<rootDir>/**/*.spec.ts'],
    coverageReporters: ['html', 'lcov', 'json', 'text', 'lcov', 'clover'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: `<rootDir>/${compilerOptions.baseUrl}/`
            .replace(/\.\//g, `/`)
            .replace(/\/\/+/g, `/`),
    }),
    globals: {
        'ts-jest': {
            tsconfig: resolve(`./tsconfig.json`),
            isolatedModules: true,
        },
    },
    verbose: true,
};
