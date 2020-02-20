import {DompurifyHook} from '../types/dompurify-hook';
import {SanitizeStyle} from '../types/sanitize-style';
import {addCSSRules} from './addCSSRules';

/**
 * uponSanitizeElementHook factory to sanitize CSS rules from HTMLStyleElement through custom function
 */
export function createUponSanitizeElementHook(
    sanitizeStyle: SanitizeStyle,
): DompurifyHook {
    return node => {
        if (node instanceof HTMLStyleElement || node instanceof SVGStyleElement) {
            // https://github.com/microsoft/TypeScript/issues/36896
            const {sheet} = node as HTMLStyleElement;

            if (sheet instanceof CSSStyleSheet) {
                node.textContent = addCSSRules(sheet.cssRules, sanitizeStyle).join('\n');
            } else {
                node.textContent = '';
            }
        }
    };
}
