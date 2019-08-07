import {Injectable, SecurityContext, Sanitizer, Inject} from '@angular/core';
import {DOMPURIFY_CONFIG} from './const/dompurify-config';
import {NgDompurifyConfig} from './types/ng-dompurify-config';
import {sanitize} from 'dompurify';

/**
 * Implementation of Angular {@link Sanitizer} purifying via dompurify
 *
 * use {@link DOMPURIFY_CONFIG} token to provide config ({@link NgDompurifyConfig})
 */
@Injectable({
    providedIn: 'root',
})
export class NgDompurifySanitizer extends Sanitizer {
    constructor(
        @Inject(DOMPURIFY_CONFIG)
        private readonly config: NgDompurifyConfig,
    ) {
        super();

        // TODO: a single point of entrance to attach hooks to DOMPurify
    }

    sanitize(
        _: SecurityContext,
        value: {} | string | null,
        config: NgDompurifyConfig = this.config,
    ): string {
        return sanitize(String(value || ''), config);
    }
}
