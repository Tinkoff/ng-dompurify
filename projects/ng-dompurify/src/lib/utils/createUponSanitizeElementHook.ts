import {SanitizeStyle} from '../types/sanitize-style';
import {DompurifyHook} from '../types/dompurify-hook';
import {addCSSRules} from './addCSSRules';

/**
 * uponSanitizeElementHook factory to sanitize CSS rules from HTMLStyleElement through custom function
 *
 * @private
 */
export function createUponSanitizeElementHook(sanitizeStyle: SanitizeStyle): DompurifyHook {
    return node => {
        if (node instanceof HTMLStyleElement && node.sheet instanceof CSSStyleSheet) {
            node.textContent = addCSSRules(node.sheet.cssRules, sanitizeStyle).join('\n');
        }
    }
}
