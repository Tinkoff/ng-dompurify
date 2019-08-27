import {SanitizeStyle} from '../types/sanitize-style';
import {validateStyles} from './validateStyles';

/**
 * Take CSS rules and analyze them, create string wrapper to
 * apply them to the DOM later on. Note that only selector rules
 * are supported right now
 *
 * @private
 */
export function addCSSRules(cssRules: CSSRuleList, sanitizeStyle: SanitizeStyle): ReadonlyArray<string> {
    const output: string[] = [];

    for (let index = cssRules.length - 1; index >= 0; index--) {
        const rule = cssRules[index];

        // check for rules with selector
        if (rule.type === 1 && (rule instanceof CSSStyleRule) && rule.selectorText) {
            output.push(rule.selectorText + '{');

            if (rule.style) {
                output.push(...validateStyles(rule.style, sanitizeStyle));
            }

            output.push('}');
        }
    }

    return output;
}
