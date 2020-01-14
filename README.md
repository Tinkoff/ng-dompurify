# NgDompurify

[![Build](https://img.shields.io/travis/TinkoffCreditSystems/ng-dompurify/master?style=flat-square)](https://travis-ci.org/TinkoffCreditSystems/ng-dompurify)
[![Coverage Status](https://img.shields.io/coveralls/github/TinkoffCreditSystems/ng-dompurify?branch=master&style=flat-square)](https://coveralls.io/github/TinkoffCreditSystems/ng-dompurify?branch=master)
[![npm version](https://img.shields.io/npm/v/@tinkoff/ng-dompurify.svg?style=flat-square)](https://npmjs.com/package/@tinkoff/ng-dompurify)
[![code style: @tinkoff/linters](https://img.shields.io/badge/code%20style-%40tinkoff%2Flinters-blue?style=flat-square)](https://github.com/TinkoffCreditSystems/linters)

> This library implements `DOMPurify` as Angular entire `DomSanitizer` and as
> standalone `Sanitizer` or `Pipe`. It delegates sanitizing to `DOMPurify` and
> supports the same configuration. See [DOMPurify](https://github.com/cure53/DOMPurify).

## Install

```
npm install @tinkoff/ng-dompurify
```

If you do not have `dompurify` in your package, install also:

```
npm install dompurify
npm install --save-dev @types/dompurify
```

## How to use

Either use pipe to sanitize your content when binding to `[innerHTML]`
or use `NgDompurifySanitizer` service manually.

```typescript
import {NgDompurifyModule} from '@tinkoff/ng-dompurify';

@NgModule({
    imports: [NgDompurifyModule],
})
export class MyModule {}
```

As a pipe:

```html
<div [innerHtml]="value | dompurify"></div>
```

As a service:

```typescript
import {SecurityContext} from '@angular/core';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';

@Component({})
export class MyComponent {
    constructor(private readonly dompurifySanitizer: NgDompurifySanitizer) {}

    purify(value: string): string {
        return this.dompurifySanitizer.sanitize(SecurityContext.HTML, value);
    }
}
```

You can also substitute entire Angular `DomSanitizer` with `DOMPurify`:

```typescript
import {DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgDompurifyDomSanitizer} from '@tinkoff/ng-dompurify';
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

## Configuring

`NgDompurifyPipe` supports passing DOMPurify config as an argument.
Config for `NgDompurifySanitizer` or `NgDompurifyDomSanitizer` can be
provided using token `DOMPURIFY_CONFIG`:

```typescript
import {DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgDompurifyDomSanitizer, DOMPURIFY_CONFIG} from '@tinkoff/ng-dompurify';
// ...

@NgModule({
    // ...
    providers: [
        {
            provide: DomSanitizer,
            useClass: NgDompurifyDomSanitizer,
        },
        {
            provide: DOMPURIFY_CONFIG,
            useValue: {FORBID_ATTR: ['id']},
        },
    ],
    // ...
})
export class AppModule {}
```

## CSS sanitization

DOMPurify does not support sanitizing CSS. `DomSanitizer` in Angular
is organized in such a way that it only received CSS rule value, and
not the name. Therefore, a method taking in CSS rule value and returning
a sanitized value is required to support CSS. You can try using internal
Angular import `ɵ_sanitizeStyle` since they use it themselves to use it in
`platform-browser` package where `DomSanitizer` is implemented. This way
level of CSS sanitization will be equal to native Angular with added benefit
of supporting inline styles in `[innerHTML]` bindings.

```typescript
import {DomSanitizer} from '@angular/platform-browser';
import {NgModule, ɵ_sanitizeStyle} from '@angular/core';
import {NgDompurifyDomSanitizer, SANITIZE_STYLE} from '@tinkoff/ng-dompurify';

@NgModule({
    // ...
    providers: [
        {
            provide: DomSanitizer,
            useClass: NgDompurifyDomSanitizer,
        },
        {
            provide: SANITIZE_STYLE,
            useValue: ɵ_sanitizeStyle,
        },
    ],
    // ...
})
export class AppModule {}
```

## Hooks

DOMPurify supports various hooks. You can provide them using `DOMPURIFY_HOOKS` token:

```typescript
import {DomSanitizer} from '@angular/platform-browser';
import {NgModule, ɵ_sanitizeStyle} from '@angular/core';
import {
    NgDompurifyDomSanitizer,
    DOMPURIFY_HOOKS,
    SANITIZE_STYLE,
} from '@tinkoff/ng-dompurify';

@NgModule({
    // ...
    providers: [
        {
            provide: DomSanitizer,
            useClass: NgDompurifyDomSanitizer,
        },
        {
            provide: SANITIZE_STYLE,
            useValue: ɵ_sanitizeStyle,
        },
        {
            provide: DOMPURIFY_HOOKS,
            useValue: [
                {
                    name: 'beforeSanitizeAttributes',
                    hook: (node: Element) => {
                        node.removeAttribute('id');
                    },
                },
            ],
        },
    ],
    // ...
})
export class AppModule {}
```

## Demo

You can see live demo here:
https://stackblitz.com/github/TinkoffCreditSystems/ng-dompurify/tree/master/projects/demo
