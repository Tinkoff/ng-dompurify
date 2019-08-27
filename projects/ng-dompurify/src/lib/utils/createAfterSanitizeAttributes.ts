import {SanitizeStyle} from '../types/sanitize-style';
import {DompurifyHook} from '../types/dompurify-hook';
import {validateStyles} from './validateStyles';

/**
 * afterSanitizeAttributes factory to sanitize CSS rules from inline styles through custom function
 *
 * @private
 */
export function createAfterSanitizeAttributes(sanitizeStyle: SanitizeStyle): DompurifyHook {
    return node => {
        if (!(node instanceof HTMLElement) || !node.hasAttribute('style')) {
            return;
        }

        const output = validateStyles(node.style, sanitizeStyle);

        if (output.length) {
            node.setAttribute('style', output.join(''));
        } else {
            node.removeAttribute('style');
        }
    }
}
