import {sanitize} from 'dompurify';
import {NgDompurifyConfig} from './types/ng-dompurify-config';
import {NGDOMPURIFY_DEFAULT_CONFIG} from './const/default-config';

/**
 * purify value via dompurify
 *
 * @param value
 * @param config config for NgDomPurify {@link NgDompurifyConfig}
 */
export function purify(
    value: {} | string | null,
    config: NgDompurifyConfig = NGDOMPURIFY_DEFAULT_CONFIG,
): string {
    return sanitize(String(value || ''), config);
}
