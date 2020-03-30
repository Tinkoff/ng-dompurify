import {DompurifyHook} from '../types/dompurify-hook';
import {SanitizeStyle} from '../types/sanitize-style';
import {addCSSRules} from './addCSSRules';

/**
 * uponSanitizeElementHook factory to sanitize CSS rules from
 * HTMLStyleElement/SVGStyleElement through custom function
 */
export function createUponSanitizeElementHook(
    sanitizeStyle: SanitizeStyle,
): DompurifyHook {
    return node => {
        if (isStyleTag(node)) {
            const {sheet} = node;

            if (sheet instanceof CSSStyleSheet) {
                node.textContent = addCSSRules(sheet.cssRules, sanitizeStyle).join('\n');
            } else {
                node.textContent = '';
            }
        }
    };
}

// Technically it can also be SVGStyleElement but it just complicates types and fails in SSR
function isStyleTag(node: Node): node is HTMLStyleElement {
    return 'sheet' in node;
}
