import {InjectionToken} from '@angular/core';
import {NgDompurifyHooks} from '../types/ng-dompurify-hooks';

/**
 * Token for adding hooks to DOMPurify, see {@link addHook}
 */
export const DOMPURIFY_HOOKS: InjectionToken<NgDompurifyHooks> = new InjectionToken<NgDompurifyHooks>(
    'Hooks for DOMPurify',
    {
        factory: () => [],
        providedIn: 'root',
    },
);
