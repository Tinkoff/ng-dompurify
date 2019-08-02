import {InjectionToken} from '@angular/core';
import {NgDompurifyConfig} from '../types/ng-dompurify-config';
import {NGDOMPURIFY_DEFAULT_CONFIG} from './default-config';

/**
 * Token that contains {@link NgDompurifyConfig}
 *
 * contains {@link NGDOMPURIFY_DEFAULT_CONFIG} by default
 */
export const DOMPURIFY_CONFIG = new InjectionToken<NgDompurifyConfig>(
    'contains config for ng-dompurify',
    {factory: () => NGDOMPURIFY_DEFAULT_CONFIG},
);
