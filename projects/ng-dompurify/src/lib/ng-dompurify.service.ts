import {inject, Inject, Injectable, Sanitizer, SecurityContext} from '@angular/core';
import {sanitize, addHook, HookName} from 'dompurify';
import {SANITIZE_STYLE} from './tokens/sanitize-style';
import {DOMPURIFY_HOOKS} from './tokens/dompurify-hooks';
import {DOMPURIFY_CONFIG} from './tokens/dompurify-config';
import {NgDompurifyConfig} from './types/ng-dompurify-config';
import {SanitizeStyle} from './types/sanitize-style';
import {NgDompurifyHook} from './types/ng-dompurify-hook';
import {createUponSanitizeElementHook} from './utils/createUponSanitizeElementHook';
import {createAfterSanitizeAttributes} from './utils/createAfterSanitizeAttributes';

/**
 * Implementation of Angular {@link Sanitizer} purifying via DOMPurify
 *
 * use {@link DOMPURIFY_CONFIG} token to provide config ({@link NgDompurifyConfig})
 * use {@link SANITIZE_STYLE} token to provide a style sanitizing method ({@link SanitizeStyle})
 * use {@link DOMPURIFY_HOOKS} token to provide a hooks for DOMPurify ({@link addHook})
 */
@Injectable({
    providedIn: 'root',
})
export class NgDompurifySanitizer extends Sanitizer {
    constructor(
        @Inject(DOMPURIFY_CONFIG)
        private readonly config: NgDompurifyConfig,
        @Inject(SANITIZE_STYLE)
        private readonly sanitizeStyle: SanitizeStyle,
        @Inject(DOMPURIFY_HOOKS)
        hooks: ReadonlyArray<NgDompurifyHook>,
    ) {
        super();
        
        addHook('uponSanitizeElement', createUponSanitizeElementHook(this.sanitizeStyle));
        addHook('afterSanitizeAttributes', createAfterSanitizeAttributes(this.sanitizeStyle));

        hooks.forEach(({name, hook}) => {
            addHook(name, hook);
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
            : sanitize(String(value || ''), config);
    }
}
