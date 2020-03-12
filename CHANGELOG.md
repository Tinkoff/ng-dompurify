# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v2.0.1...v2.1.0) (2020-03-11)

### Bug Fixes

-   **service:** implements now Angular Sanitizer insted of extending it to prevent problems in Ivy projects ([2e7f7a7](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/2e7f7a7))

### [2.0.1](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v2.0.0...v2.0.1) (2020-02-26)

### Bug Fixes

-   **SVG:** fix SVG style vulnerability ([#36](https://github.com/TinkoffCreditSystems/ng-dompurify/issues/36)) ([87edb38](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/87edb38))

## [2.0.0](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.1...v2.0.0) (2019-11-05)

### Features

-   **ssr:** support server side environment and update to DOMPurify 2+ ([#30](https://github.com/TinkoffCreditSystems/ng-dompurify/issues/30)) ([65ea43d](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/65ea43d))

### [1.1.4](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.1...v1.1.4) (2019-09-09)

### Features

-   **package-json:** update peer dependencies

### [1.1.3](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.1...v1.1.3) (2019-09-02)

### Bug Fixes

-   **dependencies:** set dependencies to be backwards compatible with Angular 6-7 ([906b61d](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/906b61d))

### [1.1.2](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.1...v1.1.2) (2019-09-02)

### Bug Fixes

-   **dependencies:** make compatible with Angular 7 ([7b3963a](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/7b3963a))

### [1.1.1](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.0...v1.1.1) (2019-09-02)

### Bug Fixes

-   **types:** preserve ReadonlyArray in compiled code to support older TypeScript versions ([387e87b](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/387e87b))

## [1.1.0](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.0.0...v1.1.0) (2019-08-30)

### Features

-   **css:** support sanitizing CSS through provided handler ([be0d3a6](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/be0d3a6))
-   **NgDompurifySanitizer:** make service a single point of entrance to be able to attach hooks to DOMPurify in its constructor later ([78ccfe9](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/78ccfe9))

## 1.0.0 (2019-08-02)

Initial release of NgDompurify. This library implements DOMPurify as Angular entire DomSanitizer and as standalone Sanitizer or Pipe. It delegates sanitizing to DOMPurify and supports the same configuration.

### Features

-   **NgDompurifyPipe:** add pipe ([916df6c](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/916df6c))
-   **NgDompurifyDomSanitizer:** add DOM sanitizer service ([916df6c](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/916df6c))
-   **NgDompurifySanitizer:** add sanitizer service ([916df6c](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/916df6c))
