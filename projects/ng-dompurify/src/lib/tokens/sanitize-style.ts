import {InjectionToken} from '@angular/core';
import {SanitizeStyle} from '../types/sanitize-style';

/**
 * A function that takes style rule value as input and returns a sanitized string
 *
 * NOTE: Angular 10 removed CSS sanitation so by default this method does nothing
 */
export const SANITIZE_STYLE = new InjectionToken<SanitizeStyle>(
    'A function that sanitizes value for a CSS rule',
    {
        factory: () => value => value,
        providedIn: 'root',
    },
);
