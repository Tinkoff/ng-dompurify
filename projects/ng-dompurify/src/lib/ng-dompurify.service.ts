import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, Sanitizer, SecurityContext} from '@angular/core';
import * as dompurify from 'dompurify';
import {DOMPurifyI} from 'dompurify';
import {DOMPURIFY_CONFIG} from './tokens/dompurify-config';
import {DOMPURIFY_HOOKS} from './tokens/dompurify-hooks';
import {SANITIZE_STYLE} from './tokens/sanitize-style';
import {NgDompurifyConfig} from './types/ng-dompurify-config';
import {NgDompurifyHook} from './types/ng-dompurify-hook';
import {SanitizeStyle} from './types/sanitize-style';

const createDOMPurify = dompurify;

/**
 * Implementation of Angular {@link Sanitizer} purifying via DOMPurify
 *
 * use {@link DOMPURIFY_CONFIG} token to provide config ({@link NgDompurifyConfig})
 * use {@link SANITIZE_STYLE} token to provide a style sanitizing method ({@link SanitizeStyle})
 * use {@link DOMPURIFY_HOOKS} token to provide a hooks for DOMPurify ({@link addHook})
 *
 * Ambient type cannot be used without @dynamic https://github.com/angular/angular/issues/23395
 * @dynamic
 */
@Injectable({
    providedIn: 'root',
})
export class NgDompurifySanitizer implements Sanitizer {
    private readonly domPurify: DOMPurifyI;

    constructor(
        @Inject(DOMPURIFY_CONFIG)
        private readonly config: NgDompurifyConfig,
        @Inject(SANITIZE_STYLE)
        private readonly sanitizeStyle: SanitizeStyle,
        @Inject(DOCUMENT) {defaultView}: Document,
        @Inject(DOMPURIFY_HOOKS)
        hooks: ReadonlyArray<NgDompurifyHook>,
    ) {
        this.domPurify = createDOMPurify(defaultView!);

        hooks.forEach(({name, hook}) => {
            this.domPurify.addHook(name, hook);
        });
    }

    sanitize(
        context: SecurityContext,
        value: {} | string | null,
        config: NgDompurifyConfig = this.config,
    ): string {
        if (context === SecurityContext.SCRIPT) {
            throw new Error('DOMPurify does not support SCRIPT context');
        }

        return context === SecurityContext.STYLE
            ? this.sanitizeStyle(String(value))
            : this.domPurify.sanitize(String(value || ''), config);
    }
}
