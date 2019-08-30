# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/TinkoffCreditSystems/ng-dompurify/compare/v1.0.0...v1.1.0) (2019-08-30)

### Features

-   **css:** support sanitizing CSS through provided handler ([be0d3a6](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/be0d3a6))
-   **css:** support sanitizing CSS through provided handler ([1321a4f](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/1321a4f))
-   **NgDompurifySanitizer:** make service a single point of entrance to be able to attach hooks to DOMPurify in its constructor later ([78ccfe9](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/78ccfe9))

## 1.0.0 (2019-08-02)

Initial release of NgDompurify. This library implements DOMPurify as Angular entire DomSanitizer and as standalone Sanitizer or Pipe. It delegates sanitizing to DOMPurify and supports the same configuration.

### Features

-   **NgDompurifyPipe:** add pipe ([916df6c](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/916df6c))
-   **NgDompurifyDomSanitizer:** add DOM sanitizer service ([916df6c](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/916df6c))
-   **NgDompurifySanitizer:** add sanitizer service ([916df6c](https://github.com/TinkoffCreditSystems/ng-dompurify/commit/916df6c))