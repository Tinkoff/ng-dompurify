import {Injectable, SecurityContext, Sanitizer, Inject} from '@angular/core';
import {purify} from './purify';
import {DOMPURIFY_CONFIG} from './const/dompurify-config';
import {NgDompurifyConfig} from './types/ng-dompurify-config';

/**
 * Implementation of Angular {@link Sanitizer} purifying via dompurify
 *
 * use {@link DOMPURIFY_CONFIG} token to provide config ({@link NgDompurifyConfig})
 */
@Injectable()
export class NgDompurifySanitizer extends Sanitizer {
    constructor(
        @Inject(DOMPURIFY_CONFIG)
        private readonly config: NgDompurifyConfig,
    ) {
        super();
    }

    sanitize(_: SecurityContext, value: {} | string | null): string {
        return purify(value, this.config);
    }
}
