# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.3](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.1...v1.1.3) (2019-09-02)


### Bug Fixes

* **dependencies:** make compatible with Angular 7 ([7b3963a](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/7b3963a))

### [1.1.2](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.1...v1.1.2) (2019-09-02)


### Bug Fixes

* **dependencies:** make compatible with Angular 7 ([7b3963a](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/7b3963a))

### [1.1.1](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.1.0...v1.1.1) (2019-09-02)


### Bug Fixes

* **types:** preserve ReadonlyArray in compiled code to support older TypeScript versions ([387e87b](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/387e87b))

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
