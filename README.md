# NgDompurify

[![Build](https://travis-ci.org/TinkoffCreditSystems/ng-dompurify.svg?branch=master)](https://travis-ci.org/TinkoffCreditSystems/ng-dompurify)
[![Coverage Status](https://coveralls.io/repos/github/TinkoffCreditSystems/ng-dompurify/badge.svg?branch=master)](https://coveralls.io/github/TinkoffCreditSystems/ng-dompurify?branch=master)
[![npm version](https://badge.fury.io/js/%40tinkoff%2Fng-dompurify.svg)](https://npmjs.com/package/@tinkoff/ng-dompurify)
[![code style: @tinkoff/linters](https://img.shields.io/badge/code%20style-%40tinkoff%2Flinters-blue)](https://github.com/TinkoffCreditSystems/linters)

> This library implements `DOMPurify` as Angular entire `DomSanitizer` and as standalone Sanitizer or Pipe.
> It delegates sanitizing to `DOMPurify` and supports the same configuration. See [DOMPurify](https://github.com/cure53/DOMPurify).

## Install

```
$ npm install @tinkoff/ng-dompurify
```

## How to use

Either use pipe to sanitize your content when binding to `[innerHTML]` or use `NgDompurifySanitizer` service manually.

You can also substitute entire Angular `DomSanitizer` with `DOMPurify`:

```typescript
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgDompurifyDomSanitizer} from 'ng-dompurify';
// ...

@NgModule({
    // ...
    providers: [
        {
            provide: DomSanitizer,
            useClass: NgDompurifyDomSanitizer,
        },
    ],
    // ...
})
export class AppModule {}
```

Config for `NgDompurifySanitizer` or `NgDompurifyDomSanitizer` can be provided using token `DOMPURIFY_CONFIG`.

_Note: Keep in mind that binding to `[style]` would be disabled if you do it this way, since `DOMPurify` does not support sanitizing CSS. By default inline CSS is also stripped like when using Angular default sanitizer._

## Demo

You can see live demo here:
https://stackblitz.com/edit/ng-dompurify-demo

## Known issues

`DOMPurify` does not support sanitizing CSS but it supports adding hooks through which you can sanitize it yourself. Adding hooks is not yet supported by `NgDompurify`.
