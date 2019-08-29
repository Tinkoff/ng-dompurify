import {inject, InjectionToken} from '@angular/core';
import {SANITIZE_STYLE} from './sanitize-style';
import {NgDompurifyHook} from '../types/ng-dompurify-hook';
import {createUponSanitizeElementHook} from '../utils/createUponSanitizeElementHook';
import {createAfterSanitizeAttributes} from '../utils/createAfterSanitizeAttributes';

/**
 * Token for adding hooks to DOMPurify, see {@link addHook}
 */
export const DOMPURIFY_HOOKS = new InjectionToken<ReadonlyArray<NgDompurifyHook>>(
    'Hooks for DOMPurify',
    {
        factory: () => [],
        providedIn: 'root',
    },
);
