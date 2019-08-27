import {InjectionToken} from '@angular/core';
import {SanitizeStyle} from '../types/sanitize-style';

/**
 * A function that takes style rule value as input and returns a sanitized string
 *
 * NOTE: Even though it's not considered good practice, you can use `ɵ_sanitizeStyle`
 * from `@angular/core` since Angular team use this private import themselves to
 * pass it between packages — this way sanitizing styles would be the same
 * as natively in Angular
 */
export const SANITIZE_STYLE = new InjectionToken<SanitizeStyle>(
    'A function that sanitizes value for a CSS rule',
    {
        factory: () => () => '',
        providedIn: 'root',
    },
);
